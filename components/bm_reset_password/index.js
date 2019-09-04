import bm_reset_password from './bm_reset_password'
// bm_reset_password.install = (Vue) => Vue.component(bm_reset_password.name,bm_reset_password);

export default {
    install(Vue){
        Vue.component('bm_reset_password',bm_reset_password)
    }
}
