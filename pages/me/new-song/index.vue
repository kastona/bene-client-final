<template>
  <v-container light class="text-center pt-0 mt-5">
    <v-card flat max-width="600px" class="mx-auto">

          <v-card flat v-if="!uploading && !completed">
            <v-container fluid>
              <v-form
                ref="form"
                v-model="valid"
              >
                <v-text-field
                  label="Song title"
                  v-model="song.title"
                  :rules="rules"
                ></v-text-field>

                <v-text-field
                  label="Artist Name"
                  v-model="song.artistName"
                  :rules="rules"
                ></v-text-field>

                <v-text-field
                  label="Featured"
                  v-model="song.featured"
                ></v-text-field>
                <v-textarea
                  name="description"
                  v-model="song.description"
                  background-color="grey lighten-2"
                  label="Song Description"
                  persistent-hint
                  hint="Could be blank"
                  auto-grow
                ></v-textarea>
                <v-textarea
                  name="lyrics"
                  v-model="song.lyrics"
                  background-color="grey lighten-2"
                  label="Lyrics"
                  persistent-hint
                  hint="Could be blank"
                  auto-grow
                ></v-textarea>

                <v-select
                  v-model="song.genre"
                  :items="genres"
                  :error-messages="genreErrors"
                  label="Genre"
                  required
                ></v-select>


                <v-radio-group  v-model="row" row>
                  <v-radio label="Audio" value="audio"></v-radio>
                  <v-radio label="Video" value="video"></v-radio>
                </v-radio-group>

                <v-file-input
                  v-model="file"
                  placeholder="click to select your song"
                  label="File input"
                  show-size
                  :accept="song.audio? 'audio/mp3' : 'video/mp4'"
                  prepend-icon="mdi-music"
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

                <v-file-input
                  v-model="art"
                  placeholder="Upload album art"
                  label="Art input"
                  show-size
                  :accept="'image/jpeg'"
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

                <v-btn
                  :disabled="!valid || uploading || !file || !art"
                  color="success"
                  class="mr-4"
                  @click="handleUploadSong"
                >
                  Upload
                  <v-icon right dark>mdi-cloud-upload</v-icon>
                </v-btn>

                <v-btn
                  color="error"
                  class="mr-4"
                  @click="reset"
                >
                  Reset Form
                </v-btn>

              </v-form>

            </v-container>
          </v-card>

          <v-card
            v-else
            elevation="6"
            class="text-left"
          >
            <v-card flat>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title
                    class="title primary--text"
                    v-text="song.title"
                  ></v-card-title>

                  <v-card-subtitle class="grey--text" v-text="song.artistName"></v-card-subtitle>
                </div>

                <v-avatar
                  class="ma-3"
                  size="50"
                  tile
                >
                  <v-icon  x-large color="primary">mdi-music-box</v-icon>

                </v-avatar>
              </div>
            </v-card>


            <v-divider></v-divider>
            <v-card-actions>
              <v-progress-linear
                :value="uploadProgress"
                height="20"
                v-if="uploadProgress <100"
                class="mx-5"
                reactive
              >
                <strong style="color: white;"><span v-if="uploading && !completed">Uploading...</span> <span v-if="completed">Upload Successful!</span> {{ uploadProgress }}%</strong>
              </v-progress-linear>

              <v-progress-linear
                :indeterminate="!showUploadError && !completed"
                height="20"
                v-if="uploadProgress >=100"
                class="mx-5"
                reactive
                :color="showUploadError?'secondary': 'primary'"
              >
                <strong v-if="!showUploadError && !completed" style="color: white;">preparing your upload...</strong>
                <strong v-if="!showUploadError && completed">Successful!</strong>
                <strong v-if="showUploadError && completed" style="color: white;">Upload failed</strong>
              </v-progress-linear>
              <v-btn @click="$router.go(0)" v-if="showUploadError">Retry</v-btn>
              <v-spacer></v-spacer>
              <v-btn nuxt :to="{ path: `/songs/${song._id}/${song.seoTitle}`}" color="primary" v-if="completed">Open</v-btn>
            </v-card-actions>
          </v-card>
    </v-card>

    <v-dialog
      v-model="showAdminContact"
      max-width="500px"
    >
      <v-card>
        <v-card-text>
          Admin Phone
        </v-card-text>
        <v-card-text>
          08032890043
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="showAdminContact = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>

  import {mapGetters, mapActions} from 'vuex'
  export default {
    middleware: ['auth'],
    data: () => ({
      file: null,
      art: null,


      song: {
        title: '',
        artistName: '',
        featured: '',
        description: '',
        lyrics: '',
        genre: null,
        audio: true,
        approved: false,
        promoted: false
      },
      uploadedSong: {},
      e6:1,
      uploading: false,
      completed: false,
      showUploadError: false,
      showAdminContact: false,
      genres: [
        'Rap/Hip Hop',
        'Gospel',
        'RnB',
        'Rock',
        'Country',
        'Gospel Rap'
      ],


      row: 'audio',

      valid: true,
      rules: [
        v => !!v || 'Cannot be blank',
      ],
      select: null,
    }),

    async asyncData({$axios, redirect, $auth}) {
      const {data} = await $axios.get('/users/me/can-upload');

      if(!data.canUpload || !$auth.user.isVerified) {
        redirect('/me')
      }
    },

    methods: {
      ...mapActions({
        uploadSong: 'songs/uploadSong'
      }),
      async handleUploadSong() {

        const formData = new FormData()

        for(const key in this.song) {
          formData.append(key, this.song[key])
        }




        formData.append('songs', this.file)
        formData.append('songs', this.art)
        try {
          this.uploading = true;
          const {data} = await this.uploadSong(formData)
          this.uploading = false;
          this.completed = true;
          this.$toasted.success('successful!')

          this.song = data;



        } catch (e) {


        this.$toasted.error('Upload failed, Please try again!', {
          duration: 8000
        })
          this.showUploadError = true
        }

      },

      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },




    },

    computed: {
      ...mapGetters({
        uploadProgress: 'songs/getUploadProgress'
      })
    },

    watch: {
      row(val) {
        this.song.audio = val === 'audio'
      }
    }
  }
</script>
