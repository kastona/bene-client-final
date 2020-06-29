<template>
  <v-container light class="text-center pt-0 mt-5">
    <v-card elevation="6" max-width="600px" class="mx-auto">
      <v-card-title>Search results for   <v-chip small class="ml-3" color="secondary"> {{ searchParam}}</v-chip></v-card-title>
      <MusicCard class="my-2"  v-for="(song,i) in songs"  :key="i" :song="song"/>
    </v-card>
  </v-container>
</template>
<script>

  import {mapActions, mapGetters} from 'vuex'
  import MusicCard from "../../../components/MusicCard";
  export default {
    components: {MusicCard},
    data: ()=> ({

    }),

    async asyncData ({ params,$axios }) {
      const searchParam = params.search.replace('%s', ' ')
      const { data } = await $axios.get(`/search/${searchParam}`)
      console.log(data)
      return { songs: data, searchParam }
    },

    methods: {


    },

    computed: {

    }
  }
</script>
