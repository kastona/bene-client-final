<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >

      <v-col  v-for="(stat, i) in stats" :key="i" cols="12" sm="5" :md="3">
        <StatCard :color="stat.color" :stat="stat"/>
      </v-col>
      <v-col cols="12" sm="5" md="3"><v-btn @click="showPhotoUpload = true" color="primary">Change Benedictionz Image</v-btn></v-col>
    </v-row>
    <ChangeBenedictionzComponent @close="showPhotoUpload = false" :upload-photo-dialog="showPhotoUpload"/>
  </v-container>
</template>
<script>
  import StatCard from '~/components/StatCard'
  import MaterialCard from '~/components/Card'
  import MaterialStatsCard from '~/components/material/AppStatsCard'
  import ChangeBenedictionzComponent from "../../components/ChangeBenedictionzComponent";
  export default {
    layout: 'admin',
    components: {
      ChangeBenedictionzComponent,
      StatCard,
      MaterialCard,
      MaterialStatsCard
    },

    data: () => ({
      showPhotoUpload: false
    }),

    async asyncData({$axios, redirect}) {
      try {
        const {data} = await $axios.get('/users/stats')


        const stats = [
          {
            title: 'Registered Artists',
            value: data.usersCount,
            link: '/admin/artists',
            color: 'primary'
          },
          {
            title: 'Total Songs',
            value: data.songsCount,
            link: '/admin/songs',
            color: 'info'
          },

          {
            title: 'Pending Song Requests',
            value: data.pendingRequests,
            link: '/admin/songs',
            color: 'secondary'
          }
        ]

        return {stats}

      }catch(error) {
        redirect('/')
      }
    }

  }
</script>
<style>

</style>
