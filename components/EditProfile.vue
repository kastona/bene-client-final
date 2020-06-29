<template>
  <v-dialog v-model="edit" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="primary--text headline">User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="tempUser.name" label="Name"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="tempUser.stageName" label="Stage Name"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="tempUser.genre"
                label="Genre"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12">
              <v-text-field
                v-model="tempUser.bio"
                label="Bio"
                hint="A short description of you. E.g Crazy and outgoing!"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn @click="saveUser()" color="primary">Update Details</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('closeEdit')">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['tempUser','saveUser','edit']
  }
</script>
