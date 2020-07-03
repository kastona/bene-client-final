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
          title="Registered Artists"
        >
          <v-data-table
            :headers="headers"
            :items="items"
            hide-actions
            @click:row="handleSelectedArtist"
            loading="true"
            :page.sync="page"
            hide-default-footer
          >

          </v-data-table>

          <div class="text-center pt2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </material-stats-card>
      </v-col>
      <v-col cols="7">
        <v-text-field
          label="Lookup Artist"
          persistent-hint
          hint="Enter Artist ID"
          v-model="lookUpId"
        ></v-text-field>
      </v-col>
      <v-col cols="7" class="px-auto">
        <v-btn
          :loading="loading3"
          :disabled="loading3"
          color="blue-grey"
          class="white--text"
          @click="lookUp"
        >
          Lookup
        </v-btn>
      </v-col>
      <v-dialog v-model="showDialog" scrollable max-width="500px">
        <v-card v-if="lookedUpArtist">
          <v-card-title class="primary--text">{{lookedUpArtist.name}} <v-spacer></v-spacer> <v-btn @click="showDialog = false" icon color="grey"><v-icon>mdi-close</v-icon></v-btn></v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col class="pb-0" cols="6">
                <strong>Artist Stage Name</strong>
                <div class="caption">{{lookedUpArtist.stageName}}</div>
              </v-col>

              <v-col class="pb-0" cols="6">
                <strong>Email</strong>
                <div class="caption">{{lookedUpArtist.email}}</div>
              </v-col>

              <v-col class="pb-0" cols="6">
                <strong>Genre</strong>
                <div class="caption">{{lookedUpArtist.genre}}</div>
              </v-col>

              <v-col class="pb-0" cols="6">
                <strong>Songs Count</strong>
                <div class="caption">{{lookedUpArtist.songsCount}}</div>
              </v-col>
              <v-col class="pb-0" cols="6">
                <strong>Account Registered</strong>
                <div class="caption">{{$moment(lookedUpArtist.createdAt).fromNow()}}</div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <!--<v-btn v-if="!lookedUpArtist.promoted" small color="primary" @click="upgradeArtist({promoted: true})">Promote</v-btn>
            <v-btn v-else small color="primary" @click="upgradeArtist({promoted: false})"> End Promotion</v-btn>-->
            <!--<v-btn @click="$router.push(`/profile/${lookedUpArtist.stageName}`)" small  color="primary">Profile</v-btn>-->
            <v-btn @click="$router.push(`/admin/songs?artist=${lookedUpArtist._id}&&name=${lookedUpArtist.stageName}`)" small  color="primary">{{lookedUpArtist.stageName}} songs</v-btn>
            <v-btn small color="secondary" @click="dialog3 = true">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="dialog3"
        max-width="500px"
      >
        <v-card>
          <v-card-title class="error--text">
            <span>Warning!</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
            Deleting a user will delete his associated songs. Are you sure of this operation?
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
              @click="deleteArtist"
            >
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
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
      lookedUpArtist: null,
      lookUpId: null,
      showDialog: false,
      dialog3: false,
      headers: [
        {
          sortable: false,
          text: 'Name',
          value: 'name'
        },
        {
          sortable: false,
          text: 'Stage Name',
          value: 'stageName',
          align: 'right'
        },
        {
          sortable: false,
          text: 'Email',
          value: 'email',
          align: 'right'
        },
        {
          sortable: false,
          text: 'Songs',
          value: 'songsCount',
          align: 'right'
        }
      ],

      page: 1,
      itemsPerPage: 2,
      pageCount: 2,
    }),

    async asyncData({$axios, redirect, $auth}) {
      try {
        const itemsPerPage = 10;
        const {data} = await $axios.get(`/users?limit=${itemsPerPage}`)
        let pageCount = data.usersCount / itemsPerPage;
        if(data.usersCount % itemsPerPage > 0) {
          pageCount +=1
        }
        return {items: data.users, usersCount: data.usersCount, pageCount}
      }catch(error) {
        redirect('/admin')
      }
    },
    methods: {
      async lookUp() {
        try {
          this.loading3 = true
          const {data} = await this.$axios.get(`/songs/${this.lookUpId}`)
          this.lookedUpArtist = data

          this.loading3 = false
        }catch(error) {
          this.$toasted.error('Some error occurred!')
          this.loading3 = false
        }
      },

      cancelDeleteOperation() {
        this.dialog3 = false;
      },
      async upgradeArtist(update) {
        try {
          const {data} = await this.$axios.patch(`/users/${this.lookedUpArtist._id}/upgrade`, update)
          this.lookedUpArtist = data
        }catch(error) {
          this.$toasted.error('Error: Artist couldn\'t be upgraded')
        }

      },

      async deleteArtist() {
        try {
          await this.$axios.delete(`/users/${this.lookedUpArtist._id}`)
          this.lookedUpArtist = null
          this.$router.go(0)
          this.$toasted.success('Successful')
        }catch(error) {
          this.$toasted.error('Couldn\'t Delete Artist')
        }
      },
      handleSelectedArtist(artist) {
        this.lookedUpArtist = artist;
          this.showDialog = true;
      },

      async loadNextBatch(val) {
        try {
          this.items = []
          const skip = (val -1) * 2

          const {data} = await this.$axios.get(`/users?skip=${skip}&limit=2`)
          this.items = data.users
        }catch(error) {
          this.$toasted.error('Some error occurred!')
        }
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
