<template>
  <v-card
    elevation="6"
    class="text-left"
  >
    <v-card flat>
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title
            class="subtitle-1 primary--text"
            v-text="song.title"
          ></v-card-title>

          <v-card-subtitle class="" v-text="song.artistName"></v-card-subtitle>
        </div>

        <v-avatar
          class="ma-3"
          size="50"
          tile
          style="margin-top: -40px;"
        >
          <v-icon v-if="song.audio" x-large color="secondary">mdi-music-box</v-icon>
          <v-icon v-else x-large color="secondary">mdi-video</v-icon>
        </v-avatar>
      </div>
    </v-card>


    <v-divider></v-divider>
    <v-card-actions>
      <v-rating readonly dense size="15" color="#FFDF00" v-model="song.rating"></v-rating> <span v-if="song.rateCount > 0" class="ml-2 overline">{{song.rateCount}} <span v-if="$vuetify.breakpoint.smAndUp">ratings</span></span>
      <v-spacer></v-spacer>
      <v-btn nuxt :to="{ path: `/songs/${seoTitle}`}" small color="primary">Open</v-btn>
      <v-btn @click="downloadSong" fab x-small color="primary" dark>
        <v-icon>mdi-download</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  export default {
    props: ['song', 'owner'],

    computed: {
      seoTitle() {
        return `${this.song._id}/${(this.song.seoTitle)}`
      },
      path() {
        return this.song.audio? 'songs': 'videos'
      }
    },
    methods: {
      async downloadSong() {
        try{

          await this.$axios.patch(`/songs/${this.song._id}/downloads`)
          this.$toasted.info('Your download is starting!')
          window.location = this.song.songUrl.replace('/upload/', `/upload/fl_attachment:${this.song.artistName + '_' + this.song.title + '_Benedictionz'}/`)

        }catch(error) {
          this.$toasted.error('download failed try again!')
        }
      }
    }
  }
</script>
<style>

</style>
