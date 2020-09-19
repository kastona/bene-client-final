<template>
    <div id="app" >
      <v-app style="background-color: #23a6d5;">
        <v-app-bar
          app
          color="primary"
          height="70"
          elevate-on-scroll
          id="scroll-target"
        >
          <v-avatar
            size="40"
            @click="$router.push('/')"
            color="grey lighten-5"
          >
            <v-img
              :src="require('@/assets/logo.png')"
              contain
              height="100%"


            />
          </v-avatar>

          <v-toolbar-title  @click="$router.push('/')" v-if="$vuetify.breakpoint.smAndUp" class="font-weight-black white--text headline">
            Benedictionz
          </v-toolbar-title>

          <v-spacer></v-spacer>
        </v-app-bar>

        <v-main>
          <nuxt/>
        </v-main>
      </v-app>
    </div>
  </template>

<script>
  export default {
    middleware: ['loggedIn']
  }
</script>
