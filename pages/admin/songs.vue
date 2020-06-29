<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >


      <v-col cols="12" md="6">
        <material-stats-card
          color="orange"
          :title="artistName? `${artistName}\'s Songs`: 'Uploaded Songs'"
        >
          <v-data-table
            :headers="headers"
            :items="items"
            loading="true"
            :page.sync="page"
            hide-default-footer
            hide-actions
            @click:row="handleSelectedSong"
          >
            <template v-slot:item.approved="{ item }">
              <v-chip small :color="item.approved? 'primary': 'secondary'" dark>{{ item.approved? 'Approved': 'Not Approved' }}</v-chip>
            </template>

            <template v-slot:item.audio="{ item }">
              <v-icon v-if="item.audio">mdi-music</v-icon>
              <v-icon v-else>mdi-video</v-icon>
            </template>
          </v-data-table>
          <div class="text-center pt2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </material-stats-card>
      </v-col>
        <v-col cols="7">
          <v-text-field
            label="Lookup Song"
            persistent-hint
            hint="Enter Song ID"
            v-model="lookUpId"
          ></v-text-field>
        </v-col>
      <v-col cols="7">
        <v-btn
          :loading="loading3"
          :disabled="loading3"
          color="blue-grey"
          class="ma-2 white--text"
          @click="lookUp"
        >
          Lookup
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="showDialog" scrollable max-width="500px">
      <v-card v-if="lookedUpSong">
        <v-card-title class="primary--text">Song title: {{lookedUpSong.title}} <v-spacer></v-spacer> <v-btn icon small color="grey" @click="showDialog = false"><v-icon>mdi-close</v-icon></v-btn></v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col class="pb-0" cols="6">
              <strong>Artist Name</strong>
              <div class="caption">{{lookedUpSong.artistName}}</div>
            </v-col>
            <v-col class="pb-0" cols="6">
              <strong>Uploaded</strong>
              <div class="caption">{{$moment(lookedUpSong.createdAt).fromNow()}}</div>
            </v-col>

            <v-col class="pb-0" cols="6">
              <strong>Song ID</strong>
              <div class="caption">{{lookedUpSong._id}}</div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn v-if="!lookedUpSong.approved" small color="primary" @click="upgradeSong({approved: true})"> Approve</v-btn>
          <v-btn v-else small color="primary" @click="upgradeSong({approved: false})"> Disapprove</v-btn>
          <v-btn nuxt :to="{ path: `/songs/${seoTitle}`}" small  color="primary">View</v-btn>
          <v-btn  small color="secondary" @click="dialog3 = true"><v-icon>mdi-delete</v-icon></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialog3"
      max-width="500px"
      persistent
    >
      <v-card>
        <v-card-title class="error--text">
          <span>Warning!</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          Are you sure you want to delete this song?
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="cancelDeleteOperation"
          >
            Cancel
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            color="error"
            text
            :loading="deleteLoading"
            @click="deleteSong"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
  import StatCard from '~/components/StatCard'
  import MaterialCard from '~/components/Card'
  import MaterialStatsCard from '~/components/material/AppCard'
  export default {
    layout: 'admin',
    components: {
      StatCard,
      MaterialCard,
      MaterialStatsCard
    },

    data: () => ({
      loader: null,
      loading3: false,
      lookedUpSong: null,
      lookUpId: null,
      showDialog: false,
      dialog3: false,
      deleteLoading: false,
      headers: [
        {
          sortable: false,
          text: 'Title',
          value: 'title'
        },
        {
          sortable: false,
          text: 'Artist',
          value: 'artistName',
        },
        {
          sortable: false,
          text: 'Type',
          value: 'audio'
        },
        {
          sortable: false,
          text: 'Approved',
          value: 'approved',
        }
      ],
      page: 1,
      pageCount: 2,
    }),

    async asyncData({$axios, redirect, route, $auth, $router}) {
      try {

        if(route.query.artist) {
          const artistName = route.query.name
          const artistRes = await $axios.get(`/songs?artist=${route.query.artist}`)
          return {items: artistRes.data.songs, songsCount: artistRes.data.songsCount, pageCount: 1, artistName}
        }
        const itemsPerPage = 10;
        const {data} = await $axios.get(`/songs?limit=${itemsPerPage}`)
        let pageCount = data.songsCount / itemsPerPage;
        if(data.songsCount % itemsPerPage > 0) {
          pageCount +=1
        }
        return {items: data.songs, songsCount: data.songsCount, pageCount}
      }catch(error) {
        redirect('/admin')
      }
    },
    methods: {
      async lookUp() {
        try {
          this.loading3 = true
          const {data} = await this.$axios.get(`/songs/${this.lookUpId}`)
          this.lookedUpSong = data

          this.loading3 = false
        }catch(error) {
          this.$toasted.error('Some error occurred!')
          this.loading3 = false
        }
      },
      async upgradeSong(update) {


        try {
          const {data} = await this.$axios.patch(`/songs/${this.lookedUpSong._id}/upgrade`, update)
          this.lookedUpSong = data
          this.$router.go(0)
        }catch(error) {
          this.$toasted.error('Some error occurred!')
        }

      },

      async deleteSong() {
        try {
          this.deleteLoading = true
          await this.$axios.delete(`/songs/${this.lookedUpSong._id}`)
          this.lookedUpSong = null
          this.dialog3 = false
          this.deleteLoading = false
          this.$toasted.success('Delete successful!')
          this.$router.go(0)
        }catch(error) {
          this.deleteLoading = false
          this.$toasted.error('couldn\'t delete song')
        }
      },
      handleSelectedSong(song) {
        this.lookedUpSong = song
        this.showDialog = true;
      },
      async loadNextBatch(val) {
        try {
          this.items = []
          const skip = (val -1) * 10
          const {data} = await this.$axios.get(`/songs?skip=${skip}`)
          this.items = data.songs
        }catch(error) {
          console.log(error.message)
        }
      },




      cancelDeleteOperation() {
        this.dialog3 = false;
      },
    },

    computed: {
      seoTitle() {
        return `${this.lookedUpSong._id}/${(this.lookedUpSong.seoTitle)}`
      },
      path() {
        return this.lookedUpSong.audio? 'songs': 'videos'
      }
    },

    watch: {
      page(val) {
        this.loadNextBatch(val)
      }
    }

  }
</script>
<style>

</style>
