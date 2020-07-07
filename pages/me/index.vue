<template>
  <div>
    <section>

      <v-alert
        v-if="uploadData.unapproved >0"
        v-model="alert"
        dismissible
        close-icon="mdi-delete"
        :color="uploadData.unapproved >2? 'secondary': 'primary'"
        border="left"
        elevation="2"
        colored-border
        icon="mdi-alert"
      >
        You've got {{uploadData.unapproved}} songs needing approval. Call admin on: <span style="font-weight: bolder" class="primary--text">08032890043</span>
      </v-alert>

      <div class="pt-3"></div>
      <v-container light class="text-center">
        <v-avatar
          class="mr-3"
          color="grey lighten-5"
          size="150"
          style="cursor: pointer"
          @click="showPhotoUpload =true "
        >
          <v-img
            contain
            max-height="100%"
            :src="profilePicUrl"
            :key="avatarKey"
          ></v-img>
        </v-avatar>

        <h2 class="display-2 primary--text text--lighten-1 font-weight-bold mb-3">{{$auth.user.stageName}}</h2>

        <p class="primary--text text--lighten-1">{{$auth.user.bio}}
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

                <v-toolbar-title class="white--text">Profile</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn @click="showEdit" class="primary--text" color="white" elevation="0">
                  Edit
                </v-btn>
              </v-toolbar>

              <v-divider></v-divider>
              <v-list color="primary pt-0" dense>

                <template>

                  <v-list-item
                    class="text--left white--text"
                  >
                    <v-list-item-content class="white--text">
                      <v-list-item-subtitle>Name</v-list-item-subtitle>
                      <v-list-item-title>{{$auth.user.name}}</v-list-item-title>
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
                      <v-list-item-title>{{$auth.user.genre}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-card>

            <v-card color="primary" elevation="5" class="mt-3 pa-3">
              <v-btn small @click="showPhotoUpload = true" class="primary--text text-capitalize my-1" color="white" elevation="0">
                Change Profile Photo
              </v-btn>

              <v-btn small @click="changePassword = true" class="primary--text text-capitalize my-1" color="white" elevation="0">
                Change Password
              </v-btn>
            </v-card>


            <v-card color="primary" elevation="5" class="mt-3 pa-3">
              <v-btn v-if="uploadData.canUpload && $auth.user.isVerified" small to="/me/new-song" class="primary--text text-capitalize my-1" color="white" elevation="0">
                Upload Song
              </v-btn>
              <v-btn @click="$router.push('/confirm-email')" class="primary--text text-capitalize my-1" color="white" elevation="0" small v-else-if="!$auth.user.isVerified">Click To Verify Email</v-btn>
              <small class="white--text" v-else-if="!uploadData.canUpload">You have more than 3 songs needing approval. Contact Admin <br> <span style="font-weight: bolder">081832828333</span></small>
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

                <v-toolbar-title class="white--text">My Songs</v-toolbar-title>

                <v-spacer></v-spacer>

                <template v-slot:extension>
                  <v-tabs
                    v-model="tab"
                    align-with-title
                    background-color="primary"

                  >
                    <v-tabs-slider></v-tabs-slider>

                    <v-tab>
                      Audio
                    </v-tab>
                    <v-tab>Videos</v-tab>
                  </v-tabs>
                </template>
              </v-toolbar>

              <v-tabs-items style="min-height: 400px;" v-model="tab">
                <v-tab-item>
                  <TabItemList :user-items="userSongs" :length="6" :page="1"/>
                </v-tab-item>
                <v-tab-item>
                  <TabItemList :user-items="userVideos" :length="6" :page="1"/>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-col>

          <v-row justify="center">
            <EditProfile @closeEdit="edit = false" :temp-user="tempUser" :edit="edit" :save-user="saveUser"/>
            <ChangeProfilePixComponent @completed="$router.go()" @close="showPhotoUpload = false" :upload-photo-dialog="showPhotoUpload"/>
            <ChangePasswordComponent @close="changePassword = false" :change-password-dialog="changePassword"/>
          </v-row>
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
    middleware: ['auth'],
    components: {
      EditProfile,
      ChangePasswordComponent,
      MusicCard,
      TabItemList,
      ChangeProfilePixComponent
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

    async asyncData ({ $axios }) {
      const api= 'https://steve-benedictonz-api.herokuapp.com'
      const userSongsData = await $axios.get(`/mysongs?audio=true&limit=5`)
      const userVideosData = await $axios.get(`/mysongs?audio=false`)
      const canUploadRes = await $axios.get('/users/me/can-upload')
      return { userSongs: userSongsData.data, userVideos: userVideosData.data, uploadData: canUploadRes.data }
    },

    computed: {
      ...mapGetters({
        api: 'getApi'
      }),
      profilePicUrl() {
        return `${this.api}/users/${this.$auth.user._id}/avatar`
      }
    },

    watch: {},



    methods: {
      ...mapActions({
        updateUser: 'authentication/updateUser'
      }),

      async saveUser() {
        await this.updateUser(this.tempUser)

        this.edit = false
      },
      showEdit() {
        this.tempUser = {
          name: this.$auth.user.name,
          stageName: this.$auth.user.stageName,
          genre: this.$auth.user.genre,
          bio: this.$auth.user.bio
        }

        this.edit = true
      }
    },

    created() {

    }

  }
</script>
<style>

</style>
