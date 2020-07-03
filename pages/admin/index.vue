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

      <v-col cols="12" sm="5" md="3"><v-btn :block="$vuetify.breakpoint.xsOnly" @click="changeTextDialog = true" color="primary">Change Benedictionz Text</v-btn></v-col>

      <v-col cols="12" sm="5" md="3"><v-btn :block="$vuetify.breakpoint.xsOnly" @click="showPhotoUpload = true" color="primary">Change Benedictionz Image</v-btn></v-col>
    </v-row>
    <ChangeBenedictionzComponent @completed="showPhotoUpload = false" @close="showPhotoUpload = false" :upload-photo-dialog="showPhotoUpload"/>
    <ChangeTextComponent :details="details"  @close="handleClose" :change-text-dialog="changeTextDialog"/>
  </v-container>
</template>
<script>
  import StatCard from '~/components/StatCard'
  import ChangeBenedictionzComponent from "../../components/ChangeBenedictionzComponent";
  import ChangeTextComponent from "../../components/ChangeTextComponent";
  export default {
    layout: 'admin',
    components: {
      ChangeTextComponent,
      ChangeBenedictionzComponent,
      StatCard,
    },

    data: () => ({
      showPhotoUpload: false,
      changeTextDialog: false
    }),

    async asyncData({$axios, redirect}) {
      try {
        const {data} = await $axios.get('/users/stats')
        const detailsRes = await $axios.get('/details')

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

        return {stats, details: detailsRes.data}

      }catch(error) {
        redirect('/')
      }
    },
    methods: {
      handleClose(data) {
        this.details = data
        this.changeTextDialog = false
      }
    }

  }
</script>
<style>

</style>
