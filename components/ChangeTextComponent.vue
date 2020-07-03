<template>
  <v-dialog persistent v-model="changeTextDialog" scrollable max-width="400px">

    <v-card>
      <v-card-title class="primary--text">Change Benedictionz Text</v-card-title>
      <v-card-text>
        <v-textarea
          name="top"
          v-model="localDetails.welcome"
          filled
          label="Top Message"
          auto-grow
        ></v-textarea>
      </v-card-text>

      <v-card-text>
        <v-textarea
          name="bottom"
          v-model="localDetails.contactMessage"
          filled
          label="Bottom Message"
          auto-grow
        ></v-textarea>
      </v-card-text>

      <v-card-actions>
        <v-btn :loading="loading" @click="updateDetails()" color="primary">Update Text</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('close', details)">Close</v-btn>

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    data: () => ({
      loading: false,
      localDetails: {

      }
    }),
    props: ['changeTextDialog', 'details'],

    methods: {
      async updateDetails() {
        this.loading = true
        const {data} = await this.$axios.patch('details', this.localDetails)
        this.localDetails = data
        this.loading =false;
        this.$emit('close', data)
      }
    },

    computed: {

    },
    created() {
      this.localDetails.title = 'Benedictionz'
      this.localDetails.welcome = this.details.welcome
      this.localDetails.contactMessage = this.details.contactMessage

    }
  }
</script>

<style>

</style>
