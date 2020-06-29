<template>
  <section id="featured">
    <div class="py-6"></div>

    <v-container light class="text-center">
      <h2 class="display-2 primary--text text--lighten-1 font-weight-bold mb-3">songs</h2>

      <v-layout
        wrap
        pa-2
        justify-center
      >
        <v-text-field
          solo
          hide-details
          style="max-width: 400px;"
          v-model:value="searchParam"
        />
        <v-btn
          :block="$vuetify.breakpoint.xsOnly"
          class="ma-0"
          color="primary"
          style="height: 48px"
          @click="searchSongs"
        >
          search
        </v-btn>
      </v-layout>
      <v-responsive
        class="mx-auto mb-8"
        width="400"
      >
        <v-divider class="mb-1"></v-divider>

      </v-responsive>

      <nuxt-child/>

    </v-container>

    <div class="py-12"></div>
  </section>
</template>
<script>
  export default {
    data: () => ({
      searchParam: null
    }),
    methods: {
      searchSongs() {
        this.$router.push(`/songs/search/${this.searchParam}`)
      }
    }
  }
</script>
<style>

</style>
