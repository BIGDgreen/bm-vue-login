import bm_phone_login from './bm_phone_login'
// bm_phone_login.install = (Vue) => Vue.component(bm_phone_login.name,bm_phone_login);

export default {
    install(Vue){
        Vue.component('bm_phone_login',bm_phone_login)
    }
}
