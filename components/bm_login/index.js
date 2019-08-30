import bm_login from './bm_login'

// bm_login.install = function(Vue) {
//     Vue.component(bm_login.name,bm_login);
// };
//
// export default bm_login;

export default {
    install(Vue){
        Vue.component('bm_login',bm_login)
    }
}
