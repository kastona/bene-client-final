import Vue from 'vue';
import VuePlyr from "vue-plyr/dist/vue-plyr.ssr";

Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: false}

  },
  emit: ['ended']
})
