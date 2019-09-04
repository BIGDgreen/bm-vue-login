import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
Vue.prototype.axios = axios;

import login from '../components/index'
Vue.use(login);

// import bm_reset_password from '../components/bm_reset_password/index'
// Vue.use(bm_reset_password);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
