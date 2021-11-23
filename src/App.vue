<template>
  <v-app>
    <v-row>
      <v-container fluid style="width: 600px">
        <div class="mb-5">
          <h1>jacoblindev.com</h1>
          <h2>Vuetify File Upload</h2>
        </div>
        <upload-file></upload-file>
      </v-container>
      <v-container fluid style="width: 600px">
        <div class="mb-5">
          <h1>jacoblindev.com</h1>
          <h2>Vuetify Images Upload</h2>
        </div>
        <upload-files></upload-files>
      </v-container>
    </v-row>
  </v-app>
</template>

<script>
import UploadFile from "./components/UploadFile.vue";
import UploadFiles from "./components/UploadFiles.vue";

export default {
  name: "App",
  components: {
    UploadFile,
    UploadFiles,
  },
};
</script>
