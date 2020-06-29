<template>
  <v-row>
    <v-col
      v-for="(song, i) in newReleases"
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
  export default {
    components: {
      MusicCard
    },
    data: () => ({

    }),

    async asyncData({$axios}) {
      try {
        const {data} = await $axios.get(`/songs?approved=true&limit=20&sortBy=createdAt:desc`)
        return {newReleases: data.songs}
      }catch(error) {
        $router.push('/')
      }
    },
  }
</script>
<style>

</style>
