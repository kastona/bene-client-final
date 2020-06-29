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
            <v-toolbar-title class="primary--text">Create Account</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="user.name"
                :rules="nameRules"
                label="Name"
                required
              ></v-text-field>

              <v-text-field
                v-model="user.email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>


              <v-text-field
                v-model="user.stageName"
                :rules="stageNameRules"
                label="Stage Name"
                required
              ></v-text-field>


              <v-text-field
                v-model="user.base"
                :rules="baseRules"
                label="Based/Location"
              ></v-text-field>

              <v-select
                v-model="user.genre"
                :items="genres"
                :error-messages="genreErrors"
                label="Genre"
                required
              ></v-select>

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
            <v-btn :disabled="!valid" :loading="loading" @click="signUp" small color="primary"><span class="text-capitalize">Create account</span></v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="$router.push('/login')" small color="primary" text><span class="text-capitalize">Login instead</span></v-btn>
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
      valid: false,
      loading: false,
      nameRules: [
        v => !!v || 'Name is required'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      stageNameRules: [
        v => !!v || 'Stage Name is required',
      ],
      genres: [
        'Rap/Hip Hop',
        'Gospel',
        'RnB',
        'Rock',
        'Country',
        'Gospel Rap'
      ],
      showPass: false,
      user: {
        name: '',
        email: '',
        stageName: '',
        base: '',
        genre: null,
        password: '',

      }
    }),

    methods: {
      ...mapActions({
          createUser: 'authentication/createUser'
        }),
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      async signUp() {
        try {
          this.loading= true
          await this.createUser(this.user)
          this.$toasted.success('Account Created Successfully')
          this.$router.push('/login')
        }catch(error) {
          this.loading= false;
          this.$toasted.error('Could not create account')
        }
      }
    },
  }
</script>
