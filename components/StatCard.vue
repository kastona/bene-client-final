<template>
  <v-card
    color="#ffffff"
    dark
    @click="$router.push(stat.link)"
  >
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title
          class="overline"
          :class="`${stat.color}--text`"
          v-text="stat.title"
        ></v-card-title>
      </div>

      <v-card
        :class="`elevation-12`"
        :color="color"
        class="pa-4"
        dark

        style="margin: -10px 10px 10px 0px;"
      >
        <v-icon
          size="20"
        >
          {{stat.value}}
        </v-icon>
      </v-card>
    </div>
  </v-card>
</template>
<script>
  export default {
    props: ['stat', 'color']
  }
</script>
<style>

</style>
