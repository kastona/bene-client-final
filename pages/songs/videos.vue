<template>
  <v-row>
    <v-col
      v-for="(video, i) in topVideos"
      cols="12"
      :key="i"
      md="4"
      sm="6"
    >
      <MusicCard :song="video"/>
    </v-col>
  </v-row>

</template>
<script>
  import MusicCard from "../../components/MusicCard";
  import {mapGetters} from 'vuex'
  export default {
    components: {
      MusicCard
    },
    data: () => ({

    }),

    async asyncData({$axios}) {
      try {
        const {data} = await $axios.get(`/songs?approved=true&limit=20&audio=false&sortBy=createdAt:desc`)
        return {topVideos: data.songs}
      }catch(error) {
        $router.push('/')
      }
    },
    computed: {

    }
  }
</script>
<style>

</style>
