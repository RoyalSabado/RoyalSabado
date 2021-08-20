import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/lib/util/colors'
import pt from 'vuetify/src/locale/pt'

Vue.use(Vuetify)

const opts = {icons: {
    iconfont: 'mdiSvg'
  }}
export default new Vuetify({
    icons: {
      iconfont: 'mdi',
    },
    theme: {
      themes: {
        light: {
          primary: colors.blueGrey.darken3,
        },
      },
    },
    lang: {
      locales: { pt },
      current: 'pt',
    },
  })
