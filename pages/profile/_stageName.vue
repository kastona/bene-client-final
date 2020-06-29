<template>
  <div>
    <section>
      <div class="pt-3"></div>
      <v-container light class="text-center">
        <v-avatar
          class="mr-3"
          color="grey lighten-5"
          size="150"
        >
          <v-img
            contain
            max-height="100%"
            :src="profilePicUrl"
            :key="avatarKey"
          ></v-img>
        </v-avatar>

        <h2 class="display-2 primary--text text--lighten-1 font-weight-bold mb-3">{{artist.stageName}}</h2>

        <p class="primary--text text--lighten-1">{{artist.bio}}
        </p>

        <v-responsive
          class="mx-auto mb-8"
          style="max-width: 400px"
        >

          <v-divider color="white"></v-divider>
        </v-responsive>
      </v-container>
    </section>
    <section>
      <v-container light class="text-center pt-0">
        <v-row>
          <v-col cols="12" sm="4">
            <v-card color="primary" elevation="5">
              <v-toolbar color="primary" flat>

                <v-toolbar-title class="white--text">{{stageName}} Profile</v-toolbar-title>
              </v-toolbar>

              <v-divider></v-divider>
              <v-list color="primary pt-0" dense>

                <template>

                  <v-list-item
                    class="text--left white--text"
                  >
                    <v-list-item-content class="white--text">
                      <v-list-item-subtitle>Name</v-list-item-subtitle>
                      <v-list-item-title>{{artist.name}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>

                <template>
                  <v-divider

                  ></v-divider>

                  <v-list-item
                    class="text--left"
                  >
                    <v-list-item-content class="white--text">
                      <v-list-item-subtitle>Genre</v-list-item-subtitle>
                      <v-list-item-title>{{artist.genre}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-card>
          </v-col>

          <v-divider></v-divider>
          <v-col cols="12" sm="8">
            <v-card
              elevation="5"
              class="mx-auto"
            >

              <v-toolbar
                color="primary"
                class="white--text"
              >

                <v-toolbar-title class="white--text">{{stageName}} songs</v-toolbar-title>

                <v-spacer></v-spacer>

                <template v-slot:extension>
                  <v-tabs
                    v-model="tab"
                    align-with-title
                    background-color="primary"

                  >
                    <v-tabs-slider></v-tabs-slider>

                    <v-tab>
                      Songs
                    </v-tab>
                  </v-tabs>
                </template>
              </v-toolbar>

              <v-tabs-items style="min-height: 400px;" v-model="tab">
                <v-tab-item>
                  <TabItemList :emptyMessage="`${artist.stageName} has no music yet.`" :user-items="userSongs" :length="6" :page="1"/>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <div class="py-12"></div>
    </section>
  </div>
</template>
<script>
  import {mapGetters, mapState, mapActions} from 'vuex'
  import MusicCard from "../../components/MusicCard";
  import TabItemList from "../../components/TabItemList";
  import ChangeProfilePixComponent from "../../components/ChangeProfilePixComponent";
  import ChangePasswordComponent from "../../components/ChangePasswordComponent";
  import EditProfile from "../../components/EditProfile";

  export default {
    components: {
      MusicCard,
      TabItemList,
    },
    data: () => ({
      tab: null,
      edit: false,
      changePassword: false,
      showPhotoUpload: false,
      tempUser: {},
      page: 2,
      avatarKey: false,
      limit: 5
    }),

    async asyncData ({ $axios, params, redirect }) {
      try {
        const userRes = await $axios.get(`/users/third/${params.stageName}`)

        console.log(userRes.data)
        const userSongsData = await $axios.get(`http://localhost:4000/songs?artist=${userRes.data._id}&limit=5`)
        return { userSongs: userSongsData.data, artist: userRes.data, stageName: params.stageName }
      }catch (error) {
        redirect('/')
      }
    },

    computed: {
      ...mapGetters({

      }),
      profilePicUrl() {
        return `http://localhost:4000/users/${this.artist._id}/avatar`
      }
    },

    watch: {},

    created() {

    },

    methods: {

    }

  }
</script>
<style>

</style>
