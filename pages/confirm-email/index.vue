<template>
<v-container fluid fill-height>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="py-3">
        <v-card-text class="display-2 text-center">
          One Moment!
        </v-card-text>
        <v-divider class="mx-8"></v-divider>

        <v-card-text class="title text-center">
          You need to confirm your email to continue. Enter the code sent to your email below.
        </v-card-text>
        <v-text-field placeholder="CODE" outlined v-model="token" solo style="width: 100px; margin-right: auto; margin-left: auto;"></v-text-field>

        <v-card-actions >
          <v-btn :disabled="disable" :loading="loading" @click="verify" style="margin-left: auto;" color="primary">Verify</v-btn>
          <v-btn style="margin-right: auto" @click="resend" color="primary">Resend</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    middleware: 'checkVerified',
    data:() => ({
      loading: false,
      token: '',
  }),

    methods: {
      ...mapActions(['setTempUser']),
      async verify() {
        this.loading = true
        try {
          if(!this.$auth.user) {
            await this.$auth.loginWith('local', {data: this.tempUser})
          }
          await this.$axios.post(`/users/confirm-email/${this.token}`)
          this.$toasted.success('Email Confirmed!')
          this.loading = false;
          await this.$router.push('/me')
        }catch(error) {
          console.log(error.message)
          this.loading = false
          this.$toasted.error('Something happened!')
        }

      },
      async resend() {
        try {
          await this.$axios.post('/users/resend-confirmation')
          this.$toasted.success('Confirmation code sent!')
        }catch(error) {
          this.$toasted.error('Some error occurred')
        }
      }
    },

    computed: {
      ...mapGetters({
        tempUser: 'getTempUser'
      }),
      disable() {
        return !this.token.length > 6
      }
    }
  }
</script>
