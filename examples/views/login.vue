<template>
    <div class="login">
        <bm_login :base-config="myConfig"
                  v-on:phoneLogin="to_phoneLogin"
                  v-on:forgetPassword="to_forgetPassword"
                  v-on:toProtocol="to_protocol"
                  @parent_login="login">
            <template v-slot:header>
                <h2>Welcome To Login</h2>
            </template>
        </bm_login>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            return{
                myConfig:{
                    //默认值
                    forgetPwd_register_protocol: true,
                    forgetPassword:true,
                    register:true,
                    protocol:true,
                    rememberPassword:true,
                    quickLogin:true,
                    otherLoginWays: true
                }
            }
        },
        methods:{
            to_phoneLogin(){
                this.$router.push({path:'/phoneLogin'});
            },
            to_forgetPassword(){
                this.$router.push({path:'/phoneValidate'});
            },
            to_protocol(){

            },
            login(input_info){
                console.log(input_info);    //用户输入的用户名和密码
                let params = new URLSearchParams();
                params.append('YourParamsName1',input_info.username);
                params.append('YourParamsName2',input_info.password);
                this.axios.post('xxx',params)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        }
    }
</script>

<style scoped>

</style>
