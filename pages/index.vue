<template>
  <div>
    <section style="background-image: linear-gradient(#23a6d5, #1788a8);">

      <v-container style="min-height: 90vh;" fluid fill-height>
        <v-layout flex align-center justify-center>
          <v-flex class="white--text text-center" xs12 md8 sm6>
              <h2 :class="$vuetify.breakpoint.smAndDown? 'heading-4': 'display-2'" class=" font-weight-bold mb-3">
                {{details.title}}</h2>

              <v-responsive
                :class="$vuetify.breakpoint.smAndDown? 'subtitle-1': 'title'" class="mx-auto font-weight-light mb-8"
                max-width="720"
              >
                {{details.welcome}}
              </v-responsive>

              <v-layout
                wrap
                pa-2
                justify-center
              >
                <v-autocomplete
                  v-model="model"
                  :loading="loading"
                  :search-input.sync="search"
                  :items="items"
                  cache-items
                  flat
                  no-data-text="Nothing here. Be a little specific!"
                  hide-details
                  hide-no-data
                  solo
                  append-icon="mdi-magnify"
                  label="Search your favourite song"
                  ref="searchBox"
                  return-object
                  style="max-width: 400px;"
                >

                </v-autocomplete>

                <v-btn
                  :block="$vuetify.breakpoint.xsOnly"
                  class="ma-0"
                  color="primary"
                  style="height: 48px"
                  @click="loadSearch(search)"
                >
                  search
                </v-btn>
              </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </section>

    <section id="featured">
      <div class="py-12"></div>

      <v-container light class="text-center">
        <h2 :class="$vuetify.breakpoint.smAndDown?'h4':'h3'"
            class="primary--text text--lighten-1 font-weight-bold mb-3">Featured Songs</h2>

        <v-responsive
          class="mx-auto"
          width="56"
        >
          <v-divider v-if="!$vuetify.breakpoint.smAndDown" class="mb-1"></v-divider>

        </v-responsive>

        <v-row>
          <v-col
            v-for="(song, n) in featuredSongs"
            :key="n"
            cols="12"
            md="4"
            sm="6"
          >
            <MusicCard :song="song"/>
          </v-col>
        </v-row>

      </v-container>
    </section>
    <section style="background-color: #ebebeb;" id="about-us">
      <div class="py-5"></div>

      <v-container light class="text-center">
        <h2 :class="$vuetify.breakpoint.smAndDown?'h4': 'display-2'"
            class=" grey--text text--darken-1 font-weight-bold mb-3">About Benedictionz</h2>

        <v-responsive
          class="mx-auto mb-8"
          width="56"
        >
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-responsive
          :class="$vuetify.breakpoint.smAndDown? 'subtitle-1':'title'"
          class="mx-auto grey--text text--darken-1 font-weight-light pb-8"
          max-width="720"
        >
          {{details.contactMessage}}
        </v-responsive>

        <div></div>

        <v-btn
          v-if="!$auth.user"
          color="grey"
          @click="gotoCreateAccount"
          outlined
          large
        >
            <span class="grey--text text--darken-1 font-weight-bold">
              Begin your journey with us
            </span>
        </v-btn>
      </v-container>

      <div class="py-12"></div>
    </section>
  </div>
</template>

<script>
  import Logo from '~/components/Logo.vue'
  import VuetifyLogo from '~/components/VuetifyLogo.vue'
  import MusicCard from "../components/MusicCard";
  import {mapGetters} from 'vuex'

  export default {
    components: {
      MusicCard,
      Logo,
      VuetifyLogo
    },

    data: () => ({
      showTopSearch: 0,
      rating: 3,


      loading: false,
      items: [],
      search: null,
      model: null,
      selected: null,
      showResults: false,
    }),

    async asyncData({$axios, dispatch}) {
      try {
        const detailsRes = await $axios.get('/details')
        const {data} = await $axios.get('/featuredSongs')
        return {featuredSongs: data, details: detailsRes.data}
      } catch (error) {
        return {featuredSongs: []}
      }
    },

    computed: {
      ...mapGetters({

      })
    },
    methods: {
      async searchTest(v) {
        const {data} = await this.$axios.get(`/search/${v}?just-search=true`)
        return data
      },

      gotoCreateAccount() {
        this.$router.push('/sign-up')
      },
      async querySelections(v) {

        try {
          this.loading = true
          this.items = await this.searchTest(v)
          this.loading = false
        } catch (error) {
          this.loading = false
        }


      },
      loadSearch(query) {
        this.$router.push(`/songs/search/${query}`)
      }
    },

    watch: {
      search(val) {
        val && val !== this.select && this.querySelections(val)
      },

      model(val) {
        val && this.loadSearch(val)
      }
    },

  }
</script>

<style>
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>
