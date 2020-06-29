<template>
  <v-row>
    <v-col
      v-for="(song, i) in topAudio"
      :key="i"
      cols="12"
      md="4"
      sm="6"
    >
      <MusicCard :song="song"/>
    </v-col>
  </v-row>

</template>
<script>
  import MusicCard from "../../components/MusicCard";
  import {mapGetters} from 'vuex';
  export default {
    components: {
      MusicCard
    },
    data: () => ({

    }),

    async asyncData({$axios}) {
      try {
        const {data} = await $axios.get(`/songs?approved=true&limit=20&audio=true&sortBy=createdAt:desc`)
        return {topAudio: data.songs}
      }catch(error) {
        $router.push('/')
      }
    },

    computed: {
      ...mapGetters({
        topAudio: 'songs/getTopAudio'
      })
    }
  }
</script>
<style>

</style>
