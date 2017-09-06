import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Register from '@/components/register'
import Address from '@/views/address.vue'
import Certification from '@/views/certification.vue'
import UploadImage from '@/views/uploadimage.vue'
import oldCertificate from "@/views/oldCertificate.vue"
import newCertificate from "@/views/newCertificate.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },{
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/certification',
      name: 'Certification',
      component: Certification
    },
    {
      path: '/uploadimage',
      name: 'UploadImage',
      component: UploadImage
    },
    {
      path: '/newcertificate',
      name: 'newCertificate',
      component: newCertificate
    },
    {
      path: '/oldcertificate',
      name: 'oldCertificate',
      component: oldCertificate
    },

  ]
})
