<template>
  <v-container light class="text-center pt-0 mt-5">
    <v-card flat max-width="600px" class="mx-auto">
      <v-card flat>
        <v-container fluid>
          <v-row>
            <v-col>
              <v-text-field
                label="Song title"
                v-model="song.title"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                label="Artist Name"
                v-model="song.artistName"
                hint="will use logged in artist name if left blank"
                persistent-hint
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                label="Featured"
                v-model="song.featured"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-textarea
                name="description"
                v-model="song.description"
                filled
                label="Song Description"
                persistent-hint
                hint="Could be blank"
                auto-grow
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                name="lyrics"
                v-model="song.lyrics"
                filled
                label="Lyrics"
                persistent-hint
                hint="Could be blank"
                auto-grow
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-btn @click="updateSong" color="primary">Update Song</v-btn>
            </v-col>

          </v-row>
        </v-container>
      </v-card>
    </v-card>
  </v-container>
</template>
<script>

  import {mapActions, mapGetters} from 'vuex'
  export default {
    middleware: 'auth',
    data: ()=> ({

    }),

    async asyncData ({ params,$axios, redirect, $auth }) {
      if(!$auth.user.isVerified) {
        redirect('/me')
      }
      const { data } = await $axios.get(`/songs/${params.id}`)
      return { song: data }
    },

    methods: {
      ...mapActions({
        update: 'songs/updateSong'
      }),
      async updateSong() {
        try{
          const temp = {title: this.song.title, artistName: this.song.artistName, featured: this.song.featured, description: this.song.description, lyrics: this.song.lyrics}
          await this.update({temp, id:  this.song._id})

          await this.$router.push('/me')
        }catch(error){
          console.log(error.message)
        }

      }

    },

    computed: {

    }
  }
</script>
