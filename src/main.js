import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'
import '@/assets/css/icon.css'


Vue.use(MuseUI)
Vue.use(Vuex)

Vue.config.productionTip = false
Vue.use(VueAxios, axios)


const store = new Vuex.Store({
  state: {
    certification: {
      company: '',
      duty: '',
      bank: '',
      bankNum: '',
      person: '',
      phone: '',
      qq: '',
      areaid: '',
      deatil: '',
      img1: '',
      img2: '',
      img3: '',
      img4: '',
      img5: '',
      img6: ''
    },
    disabled: false

  },
  mutations: {
    changeCer (state,item) {
      state.certification.company=item.company;
      state.certification.duty=item.duty;
      state.certification.bank=item.bank;
      state.certification.bankNum=item.bankNum;
      state.certification.person=item.person;
      state.certification.phone=item.phone;
      state.certification.qq=item.qq;
    },
    changeAdd(state,item) {
      state.certification.areaid=item.areaid;
      state.certification.deatil=item.detailAddress;
    },
    changeImagea(state,item) {
      state.certification.img1=item.img1;
      state.certification.img2=item.img2;
    },
    changeImageb(state,item) {
      state.certification.img3=item.img3;
      state.certification.img4=item.img4;
      state.certification.img5=item.img5;
      state.certification.img6=item.img6;
    },
    changeStatus(state,item) {
      state.disabled=item;
    }
  }
})

// store.commit('changeCer')
// console.log(store.state.a)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
