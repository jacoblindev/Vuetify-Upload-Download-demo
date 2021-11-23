<template>
  <v-app>
    <v-container fluid style="width: 600px">
      <div class="mb-5">
        <h1>jacoblindev.com</h1>
        <h2>Vuetify File Upload</h2>
      </div>
      <upload-file></upload-file>
    </v-container>
  </v-app>
</template>

<script>
import UploadFile from "./components/UploadFile.vue";

export default {
  name: "App",
  components: {
    UploadFile,
  },
};
</script>
