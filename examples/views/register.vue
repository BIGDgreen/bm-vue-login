<template>
    <div class="register">
        <bm_login :base-config="myConfig"
                  v-on:forgetPassword="to_forgetPassword"
                  v-on:phoneLogin="back_to_login"
                  @parent_login="login">
            <!-----------------------可以自定义内容放在header中(以下为示例)--------------------------->
            <template v-slot:header>
                <div style="display: flex;flex-direction: column;align-items: flex-start;">
                    <h2>用户注册</h2>
                    <h2>账号密码注册</h2>
                </div>
            </template>
        </bm_login>
    </div>
</template>

<script>
    export default {
        name: "register",
        data(){
            return{
                myConfig:{
                    forgetPwd_register_protocol: false,
                    //为false时，下面三项设置为true无效
                    rememberPassword:false,
                    quickLogin:true,
                    otherLoginWays: false,
                    login_btn_value:'注册',
                    phone_login_text:'返回账号密码登录'
                }
            }
        },
        methods:{
            //根据配置自行选择需要的方法
            to_forgetPassword(){
                //进入忘记密码页面
                this.$router.push({path:'/phoneLogin'});
            },
            login(input_info){
                //登录
                console.log(input_info);    //用户输入的用户名和密码
                let params = new URLSearchParams();
                params.append('param1',input_info.username);
                params.append('param2',input_info.password);
                //其余参数根据需要自行添加
                this.axios.post('xxx',params)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            back_to_login(){
                //返回登录页面
                this.$router.push({path:'/'});
            }
        }
    }
</script>

<style scoped>

</style>
