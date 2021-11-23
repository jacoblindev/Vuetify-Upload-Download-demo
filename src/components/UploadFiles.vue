<template>
  <div>
    <div v-if="progresses">
      <div class="mb-2" v-for="(progress, index) in progresses" :key="index">
        <span>{{ progress.fileName }}</span>
        <v-progress-linear
          v-model="progress.percentage"
          color="light-blue"
          height="25"
          reactive
        >
          <strong>{{ progress.percentage }} %</strong>
        </v-progress-linear>
      </div>
    </div>
    <v-row no-gutters justify="center" align="center">
      <v-col cols="8">
        <v-file-input
          accept="image/*"
          multiple
          show-size
          label="Select Images"
          @change="selectFiles"
        ></v-file-input>
      </v-col>

      <v-col cols="4" class="pl-2">
        <v-btn color="success" dark small @click="uploadFiles">
          Upload
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-alert
      v-if="message"
      border="left"
      color="teal"
      outlined
      class="multi-line"
    >
      {{ message }}
    </v-alert>
    <v-card v-if="fileInfos.length > 0" class="mx-auto">
      <v-list>
        <v-subheader>List of Images</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item v-for="(file, index) in fileInfos" :key="index">
            <v-list-item-content>
              <v-list-item-title class="mb-3">
                <a :href="file.url">{{ file.name }}</a>
              </v-list-item-title>
              <v-list-item-subtitle>
                <img :src="file.url" :alt="file.name" height="80px" />
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>
<script>
import UploadService from "../services/UploadFileService";
export default {
  name: "upload-files",
  data() {
    return {
      selectedFiles: [],
      progresses: [],
      message: "",
      fileInfos: [],
    };
  },
  mounted() {
    UploadService.getFiles().then((res) => {
      this.fileInfos = res.data;
    });
  },
  methods: {
    selectFiles(files) {
      this.progresses = [];
      this.selectedFiles = files;
    },
    uploadFiles() {
      this.message = "";

      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    },
    upload(index, file) {
      this.progresses[index] = { percentage: 0, fileName: file.name };

      UploadService.upload(file, (event) => {
        this.progresses[index].percentage = Math.round(
          (100 * event.loaded) / event.total
        );
      })
        .then((res) => {
          let prevMsg = this.message ? this.message + "\n" : "";
          this.message = prevMsg + res.data.message;
          return UploadService.getFiles();
        })
        .then((files) => {
          this.fileInfos = files.data;
        })
        .catch(() => {
          this.progresses[index].percentage = 0;
          this.message = "Couldn't upload the file: " + file.name;
        });
    },
  },
};
</script>
