<template>
  <v-dialog persistent v-model="changePasswordDialog" scrollable max-width="400px">

    <v-card style="height: 300px;">
      <v-card-title class="primary--text">Change Password</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          :lazy-validation="lazy"
          class="pt-5"
        >
          <v-text-field
            dense
            type="password"
            v-model="password"
            label="Old Password"
            required
          ></v-text-field>

          <v-text-field
            dense
            type="password"
            v-model="newPassword"
            label="New Password"
            required
          ></v-text-field>

          <v-text-field
            dense
            type="password"
            v-model="newPasswordConfirm"
            :rules="[newPasswordRules, notEmpty]"
            label="Confirm Password"
            required
          ></v-text-field>


        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          :disabled="!valid"
          color="primary"
          class="mr-4"
          @click="handleUpdate"
        >
          Change
        </v-btn>

        <v-btn
          color="error"
          class="mr-4"
          @click="reset"
        >
          Reset
        </v-btn>

        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('close')">Close</v-btn>

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
  import {mapActions} from 'vuex'
  export default {

    data: () => ({
      valid: true,
      password: '',
      newPassword: '',
      newPasswordConfirm: '',

      lazy: false,
    }),

    methods: {
      ...mapActions({
        updatePassword: 'authentication/updatePassword'
      }),
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      newPasswordRules(value) {
        return value === this.newPassword || 'Password Don\'t Match'
      },

      notEmpty(value) {
        return value !== '' || 'Cannot Be Empty'
      },
      async handleUpdate() {
        try {
          await this.updatePassword({password: this.password, newPassword: this.newPassword})
          //TODO: Toast for successful password change
          this.$emit('close')
        }catch(error) {
          //TODO: set Error on dialog
        }

      }
    },

    computed: {

    },

    props: ['changePasswordDialog']
  }
</script>

<style>

</style>
