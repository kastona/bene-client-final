<template>
  <div>
    <section style="height: 80vh;background-image: linear-gradient(#23a6d5, #1788a8);">

      <v-container class="text-center white--text">
        <h2 :class="$vuetify.breakpoint.smAndDown? 'heading-4': 'display-2'" class=" font-weight-bold mb-3">BENEDICTIONS</h2>

        <v-responsive
          :class="$vuetify.breakpoint.smAndDown? 'subtitle-2': 'title'" class="mx-auto font-weight-light mb-8"
          max-width="720"
        >
          The best place to find your favourite songs and artists <br>
          The right place to get the audience your music deserves.
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
        <div></div>
      </v-container>
    </section>

  <section id="featured">
    <div class="py-12"></div>

    <v-container light class="text-center">
      <h2 :class="$vuetify.breakpoint.smAndDown?'h4':'h3'" class="primary--text text--lighten-1 font-weight-bold mb-3">Featured Songs</h2>

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
        <h2 :class="$vuetify.breakpoint.smAndDown?'h4': 'display-2'" class=" grey--text text--darken-1 font-weight-bold mb-3">About Benedictionz</h2>

        <v-responsive
          class="mx-auto mb-8"
          width="56"
        >
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-responsive
          :class="$vuetify.breakpoint.smAndDown? 'subtitle-1':'title'" class="mx-auto grey--text text--darken-1 font-weight-light pb-8"
          max-width="720"
        >
          Benedictions is a music sharing application. We care about your music and we have what it takes to get your music out there. Thank you as you partner with us.
        </v-responsive>

        <div></div>

        <v-btn
          color="grey"
          @click="$router.push('/sign-up')"
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

  async asyncData({$axios}) {
    try {
     const {data} = await $axios.get('/featuredSongs')
      return {featuredSongs: data}
    }catch(error) {
      return {featuredSongs: []}
    }
  },

  computed: {

  },
  methods: {
    onScroll (e) {
      this.showTopSearch = e.target.scrollTop
    },
    async searchTest(v) {
      const {data} = await this.$axios.get(`/search/${v}?just-search=true`)
      return data
    },

    async querySelections (v) {

      try {
        this.loading = true
        this.items = await this.searchTest(v)
        this.loading = false
      }catch(error) {
        this.loading = false
      }


    },
    loadSearch(query) {
      this.$router.push(`/songs/search/${query}`)
    }
  },

  watch: {
    search (val) {
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
