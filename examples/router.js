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
      path: '/register',
      name: 'register',
      component: () => import('./views/register.vue')
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
      path: '/selectCode',
      name: 'selectCode',
      component: () => import('./views/select_code.vue')
    },
    {
      path: '/phoneValidate',
      name: 'phoneValidate',
      component: () => import('./views/phone_validate.vue')
    },
    {
      path: '/phoneValidate/resetPassword',
      name: 'resetPassword',
      component: () => import('./views/reset_password.vue')
    },
  ]
})
