<template>
  <v-footer
    dark
    padless
  >
    <v-card
      flat
      tile
      style="width: 100%"
      class="accent darken-2 white--text text-center"
    >
      <v-card-text>
        <v-btn
          class="mx-4 white--text"
          icon
          link
          target="_blank"
          href="https://web.facebook.com/Benedictionz"
        >
          <v-icon size="24px">mdi-facebook</v-icon>
        </v-btn>

        <v-btn
          class="mx-4 white--text"
          icon
          href="https://www.instagram.com/benedictionz_media/"
          link
          target="_blank"
        >
          <v-icon size="24px">mdi-instagram</v-icon>
        </v-btn>



      </v-card-text>

      <v-card-text class="white--text pt-0">
        <span class="px-5"><v-icon>mdi-phone</v-icon> 08032890043</span>

        <span><v-icon>mdi-email</v-icon> benedictionz.media@gmail.com</span>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        &copy; {{ new Date().getFullYear() }} — <strong>Benedictionz</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
