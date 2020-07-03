<template>
  <div id="app" >
    <v-app style="background-color: #f1f1ff;" light>
      <v-app-bar
        color="primary"
        dark
      >
        <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = true"></v-app-bar-nav-icon>

        <v-avatar  size="50"  @click="$router.push('/')">
          <v-img
            :src="require('@/assets/logo.png')"
            contain
            max-height="70%"


          />
        </v-avatar>


        <v-toolbar-title @click="$router.push('/')">Benedictionz</v-toolbar-title>


        <v-spacer></v-spacer>

        <v-btn
          nuxt
          :to="'/admin'"
          class="ml-0 hidden-sm-and-down"
          text
        >
          Admin
        </v-btn>

        <v-btn
          nuxt
          :to="'/admin/artists'"
          class="ml-0 hidden-sm-and-down"
          text
        >
          All Artists
        </v-btn>

        <v-btn
          nuxt
          :to="'/admin/songs'"
          class="ml-0 hidden-sm-and-down"
          text
        >
          All Songs
        </v-btn>

        <v-spacer />


      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            active-class="primary--text text--accent-4"
          >
            <v-list-item nuxt :to="'/'">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>


            <v-list-item nuxt :to="'/admin'">
              <v-list-item-icon>
                <v-icon>mdi-account-cog</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Admin</v-list-item-title>
            </v-list-item>


            <v-list-item nuxt :to="'/admin/songs'">
              <v-list-item-icon>
                <v-icon>mdi-music</v-icon>
              </v-list-item-icon>
              <v-list-item-title>All Songs</v-list-item-title>
            </v-list-item>

            <v-list-item nuxt :to="'/admin/artists'">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>All Artists</v-list-item-title>
            </v-list-item>


          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>


      <v-main>
        <nuxt/>
      </v-main>
    </v-app>
  </div>
</template>


<script>
  import Logo from '~/components/Logo.vue'
  import VuetifyLogo from '~/components/VuetifyLogo.vue'
  import {mapGetters} from 'vuex'
  export default {

    data: () => ({
      drawer: false,
    }),

    methods: {
      onScroll (e) {
        this.showTopSearch = e.target.scrollTop
      },
    },

    computed: {
      ...mapGetters({
        api: 'getApi'
      }),
      profilePicUrl() {
        return `${this.api}/users/${this.$auth.user._id}/avatar`
      }
    }

  }
</script>

