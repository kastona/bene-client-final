<template>
<v-container fluid fill-height>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="py-3">
        <v-card-text class="display-2 text-center">
          One Moment!
        </v-card-text>
        <v-divider class="mx-8"></v-divider>

        <v-card-text class="display-1 text-center">
          Confirm your email to continue to your account.
        </v-card-text>

        <v-card-actions >
          <v-btn :loading="loading" @click="resend" style="margin-left: auto; margin-right: auto" color="primary">Resend Confirmation</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
  export default {
    middleware: 'checkVerified',
    data:() => ({
      loading: false
  }),

    async asyncData({$axios, $auth, redirect, params}) {

      try {
        const token = params.confirmToken
        if (token) {
          await $axios.post(`/users/confirm-email/${token}`)
          await $auth.fetchUser();


        }

      }catch(error) {

      }
    },
    methods: {
      async resend() {
        this.loading = true
        try {
          await this.$axios.post('/users/resend-confirmation')
          this.$toasted.success('Confirmation link sent!')
          this.loading = false;
        }catch(error) {
          this.loading = false
          this.$toasted.error('Something happened!')
        }

      }
    }
  }
</script>
