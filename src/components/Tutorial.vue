<template>
  <div v-if="currentTutorial" class="edit-form py-3">
    <p class="headline">Edit Tutorial</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentTutorial.title"
        :rules="[(v) => !!v || 'Title is required']"
        label="Title"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentTutorial.description"
        :rules="[(v) => !!v || 'Description is required']"
        label="Description"
        required
      ></v-text-field>

      <label><strong>Status:</strong></label>
      {{ currentTutorial.published == 1 ? "Published" : "Pending" }}

      <v-divider class="my-5"></v-divider>

      <v-btn
        v-if="currentTutorial.published == 1"
        @click="updatePublished(0)"
        color="warning"
        small
        class="mr-2"
      >
        UnPublish
      </v-btn>

      <v-btn
        v-else
        @click="updatePublished(1)"
        color="primary"
        small
        class="mr-2"
      >
        Publish
      </v-btn>

      <v-btn color="error" small class="mr-2" @click="deleteTutorial">
        Delete
      </v-btn>

      <v-btn color="success" small @click="updateTutorial"> Update </v-btn>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "tutorial",
  data() {
    return {
      currentTutorial: null,
      message: "",
    };
  },
  methods: {
    getTutorial(id) {
      TutorialDataService.get(id)
        .then((response) => {
          this.currentTutorial = response.data;
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentTutorial.id,
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
        published: status,
      };

      TutorialDataService.update(this.currentTutorial.id, data)
        .then((response) => {
          this.currentTutorial.published = status;
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    updateTutorial() {
      TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
        .then((response) => {
          console.log(response.data);
          this.message = "The tutorial was updated successfully!";
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteTutorial() {
      TutorialDataService.delete(this.currentTutorial.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "tutorials" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getTutorial(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>