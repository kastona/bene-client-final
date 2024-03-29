<template>
  <div>
    <section  id="about-us">
      <div class="pb-6"></div>

      <v-container light class="text-center">
        <h5 :class="$vuetify.breakpoint.smAndDown? 'title': 'display-2'" class=" grey--text text--darken-1 font-weight-bold mb-3">{{song.title}}</h5>

        <p class="primary--text"><span style="font-style: italic;">by</span> {{song.artistName}} <span v-if="song.featured"> ft {{song.featured}}</span></p>
        <v-responsive
          class="mx-auto mb-8"
          style="max-width: 400px"
        >

          <v-divider></v-divider>
        </v-responsive>


        <v-row>
          <v-col cols="12" md="8" offset-md="2">
              <template v-if="song.audio">
                <v-img  eager :src="song.artUrl.length > 1? song.artUrl: 'https://res.cloudinary.com/benedictionz/image/upload/v1593870413/benedictionz%20files/bene_ylek4a.jpg'" contain :aspect-ratio="$vuetify.breakpoint.xsOnly? 1.1: 1.7"></v-img>
              </template>
            <v-divider v-if="song.audio" class="my-7"></v-divider>
            <v-responsive
              class="mx-auto grey--text text--darken-1 font-weight-light mb-8"
              max-width="720"
            >
              <p class="subtitle-1">About Song</p>
              <p class="wrap-text">{{song.description}}</p>
            </v-responsive>
            <v-responsive v-if="song.audio && (song.approved || $auth.user.admin)" class="mx-auto mb-4" style="max-width: 800px;">
              <vue-plyr class="pt-3" ref="plyr">
                <audio>
                  <source :src="song.songUrl" type="audio/mp3"/>
                </audio>
              </vue-plyr>
            </v-responsive>
              <template v-if="!song.audio && (song.approved || $auth.user.admin)">
                <vue-plyr>
                  <video ref="plyr" :src="song.songUrl">
                  </video>
                </vue-plyr>
              </template>




          </v-col>
          <v-col cols="12">
            <template>
              <v-responsive v-if="song.approved" class="mx-auto">
                <v-btn @click="initiateDownload(song.songUrl)" small color="primary" dark>
                  <v-icon  small>mdi-download</v-icon> Download
                </v-btn>

                <v-btn class=""  small color="">
                  <ShareNetwork
                    network="facebook"
                    :url="`https://www.benedictionz.com/songs/${song._id}/${song.seoTitle}`"
                    :title="`${song.artistName} - ${song.title} | Benedictionz.com`"
                  >
                    Share on Facebook
                  </ShareNetwork>
                </v-btn>
              </v-responsive>
              <v-responsive v-else>
                <p class="title">Song not approved yet! <br>If you are the owner, contact the admin on: 08032890043</p>
              </v-responsive>
            </template>
          </v-col>
          <v-col v-if="canRate && song.approved" cols="12" md="8" offset-md="2">
            Rate song <v-rating  dense size="20" color="#FFDF00" v-model="rating"></v-rating>
            <v-btn @click="rate" :disabled="rating<1 ">Rate</v-btn>
          </v-col>
          <v-col v-else>
            <p>{{rateMessage}}</p>
          </v-col>
        </v-row>

        <v-divider class="my-3"></v-divider>


        <v-responsive
          style="background-color: #ffffff;"
          class="mx-auto px-2 py-2 subtitle-1 grey--text font-italic mb-8"
          max-width="720"
        >
          <p class="secondary--text">~Lyrics~</p>
          <p class="wrap-text">{{song.lyrics}}</p>
        </v-responsive>
      </v-container>
    </section>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import MaterialCard from '~/components/Card'
  export default {
    components: {
      MaterialCard
    },
    data: () => ({
      item: 1,
      rating: 0,
    }),

    head () {
      return {
        title: this.song.seoTitle.replace(/-/g, ' '),
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          { hid: 'og:title', property: 'og:title', content: `${this.song.seoTitle.replace(/-/g, ' ')}` },
          { hid: 'og:description', property: 'og:description', content: `${this.song.description}` },
          {hid: 'og:url', property:'og:url', content: `https://www.benedictionz.com/songs/${this.song._id}/${this.song.seoTitle}`},
          { hid: 'og:site_name', property: 'og:site_name', content: `Benedictionz Media` },
          { hid: 'og:image', property: 'og:image', content: `${this.song.artUrl}` },
          { hid: 'og:type', property: 'og:type', content: `website` },
          { hid: 'og:image:width', property: 'og:image:width', content: `400` },
          { hid: 'og:image:height', property: 'og:image:height', content: `400` },
        ]
      }
    },

    async asyncData ({ params,$axios, $auth }) {
      const { data } = await $axios.get(`/songs/${params.id}`)
      let rateMessage = 'Thanks for rating this song!'
      let canRate;
      if(!$auth.user) {
        canRate = false
        rateMessage = ''
      }else {
        try {
          const rateRes = await $axios.get(`/songs/can-rate/${params.id}`)
          canRate = rateRes.data
        }catch(error) {
          canRate = false
          rateMessage = ''
        }
      }

      return { song: data, canRate, rateMessage}
    },

    methods: {
      ...mapActions({
        incrementHitsCount: 'songs/incrementHitsCount',
        rateSong: 'songs/rateSong'
      }),
      async rate() {
        const {data} = await this.rateSong({rating: this.rating, id: this.song._id})
        this.canRate = false
      },
      async initiateDownload(downloadURL) {
        try{

          await this.$axios.patch(`/songs/${this.song._id}/downloads`)
          this.$toasted.info('Your download is starting!')
          window.location = this.song.songUrl.replace('/upload/', `/upload/fl_attachment:${this.song.artistName + '_' + this.song.title + '_Benedictionz'}/`)

        }catch(error) {
          this.$toasted.error('download failed try again!')
        }
      }

    },

    computed: {
      ...mapGetters({
        api: 'getApi'
      }),
      player () {
        return this.$refs.plyr.player
      }
    },

    mounted () {
      if(this.song.audio)
      this.player.on('ended', () => {
        this.incrementHitsCount(this.song._id)
      })
    }
  }
</script>
<style scoped>
  .wrap-text {
    white-space: pre-line;
  }
</style>
