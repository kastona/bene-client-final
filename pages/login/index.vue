<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card class="elevation-12">
          <v-toolbar
            flat
          >
            <v-toolbar-title class="primary--text">Login</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                dense
                color="grey"
                label="Login"
                name="login"
                v-model:value="user.email"
                type="text"
              />


              <v-text-field
                dense
                color="grey"
                @click:append="() => (showPass = !showPass)"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                id="password"
                label="Password"
                name="password"
                v-model:value="user.password"
                :type="showPass ? 'text' : 'password'"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="$router.push('/sign-up')" small text><span class="text-capitalize primary--text">Create an account</span></v-btn>
            <v-spacer />
            <v-btn @click="login" :loading="loading" small color="primary">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import {mapActions} from 'vuex'
  export default {
    layout: 'auth',
    data: () => ({
      showPass: false,
      loading: false,
      user: {
        email: '',
        password: ''
      }
    }),
    methods: {
      async login() {
        try {
          this.loading = true
          await this.$auth.loginWith('local', {data: this.user})

          this.$toasted.success('Login Successful')
          if(!this.$auth.user.isVerified) {
            await this.$router.push(`/confirm-email`)
          }else {
            await this.$router.push('/')
          }
        }catch(error) {
          this.loading = false
          this.$toasted.error(error.response.data)
        }

      }
    }
  }
</script>
