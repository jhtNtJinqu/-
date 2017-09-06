import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'
Vue.use(MuseUI)


Vue.config.productionTip = false
Vue.use(VueAxios, axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
