import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/phoneLogin',
      name: 'phoneLogin',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/phone_login.vue')
    },
    {
      path: '/phoneLogin/selectCode',
      name: 'selectCode',
      component: () => import('./views/select_code.vue')
    }
  ]
})
