import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import colors from "vuetify/es5/util/colors"; // Ensure you are using css-loader version "^2.1.1" ,
Vue.use(Vuetify)

export default ctx => {
  const vuetify = new Vuetify({
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#23a6d5',
          accent: colors.grey.darken3,
          secondary: '#e73c7e',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  })

  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}
