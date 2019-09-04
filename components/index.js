import bm_login from './bm_login/bm_login'
import bm_phone_login from './bm_phone_login/bm_phone_login'
import bm_select_code from './bm_select_code/bm_select_code'
import bm_reset_password from './bm_reset_password/bm_reset_password'

const components = [
    bm_login,
    bm_phone_login,
    bm_select_code,
    bm_reset_password
];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
    //判断是否安装
    if(install.installed) return
        //遍历注册全局组件
        components.map(component => Vue.component(component.name,component))
};

//是否直接引入组件
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export {
    //导出的对象必须具有 install，才能被 Vue.use() 方法安装
    install,
    //组件列表
    bm_login,
    bm_phone_login,
    bm_select_code,
    bm_reset_password
}

export default {
    install,
    bm_login,
    bm_phone_login,
    bm_select_code,
    bm_reset_password
}
