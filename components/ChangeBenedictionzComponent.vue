<template>
  <v-dialog persistent v-model="uploadPhotoDialog" scrollable max-width="400px">

    <v-card>
      <v-card-title class="primary--text">Change Benedictionz Image</v-card-title>
      <v-card-text class="pt-5">
        <v-file-input
          v-model="file"
          placeholder="click to select an image"
          label="File input"
          show-size
          accept="image/jpeg"
          prepend-icon="mdi-photo"
          outlined
          dense
        >
          <template v-slot:selection="{ text }">
            <v-chip
              small
              label
              color="primary"
            >
              {{text}}}
            </v-chip>
          </template>
        </v-file-input>
        <v-progress-linear
          :value="uploadProgress"
          height="20"

          v-if="uploading && !completed"
          class="mx-5"
          reactive
        >
          <strong style="color: white;"><span v-if="uploading && !completed">Uploading...</span> <span v-if="completed">Upload Successful!</span> {{ uploadProgress }}%</strong>
        </v-progress-linear>
      </v-card-text>
      <v-card-actions>
        <v-btn
          :disabled="file && file.length < 1"
          color="success"
          @click="handleUploadSong"
          class="ml-5"
        >
          Upload
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>

        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('close')">Close</v-btn>

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    data: () => ({
      file: [],
      uploading: false,
      completed: false,
    }),
    props: ['uploadPhotoDialog'],

    methods: {
      ...mapActions({
        uploadPicture: 'authentication/uploadBenedictionzPic'
      }),
      async handleUploadSong() {

        const formData = new FormData()

        formData.append('avatar', this.file)


        try {
          this.uploading = true;
          await this.uploadPicture(formData)
          this.uploading = false;
          this.completed = true;
          this.$emit('completed')




        } catch (error) {
          this.$toasted.error('An Error Occurred!')
        }

      },
    },

    computed: {
      ...mapGetters({
        uploadProgress: 'authentication/getUploadProgress'
      }),

    }
  }
</script>

<style>

</style>
