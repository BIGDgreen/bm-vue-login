<template>
    <div class="phone_login">
        <bm_phone_login v-on:accountLogin="to_account_login"
                       v-on:changedPhone="to_change_phone"
                       v-on:qq_login="qqLogin"
                       v-on:weixin_login="weixinLogin"
                       v-on:weibo_login="weiboLogin"
                       @parent_choose_area="to_chooseArea"
                       @parent_get_code="getCode"
                       @parent_phone_login="phoneLogin"
                       :base-config="myConfig">
            <!-----------------------可以自定义内容放在header中(以下为示例)--------------------------->
            <template v-slot:header>
                <div style="display: flex;flex-direction: row;justify-content: space-around;align-items: center">
                    <h2>Welcome To PhoneLogin</h2>
                </div>
            </template>
            <!--------------------------------初始区号：+86(建议不要改变)-------------------------->
            <template v-slot:country_tel>+{{countryTel}}</template>
        </bm_phone_login>
    </div>
</template>

<script>
    export default {
        name: "phone_login",
        data(){
            return{
                countryTel:"",
                myConfig: {
                    code_length:'6',
                    accountLogin:true,
                    changedPhone: true,
                    protocol: true,
                    otherLoginWays: true,
                    //登录按钮中的内容
                    login_btn_value: '登录'
                }
            }
        },
        methods:{
            to_chooseArea(){
                // 跳转到区号选择页面
                this.$router.push({path:'/selectCode'});
            },
            to_account_login(){
                // 跳转到账号密码登录页面
                this.$router.push({path:'/'});
            },
            to_change_phone(){
                //跳转到更改手机号页面
            },
            getCode(tel){
                //获取验证码
                console.log("tel:"+tel);//用户输入的手机号
                let params = new URLSearchParams();
                //参数：手机号（可根据自己需要自行添加）
                params.append('YourParamName',tel);
                //发送请求
                this.axios.post('xxx',params)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            phoneLogin(inputInfo){
                //登录
                console.log(inputInfo);//用户输入的手机号及验证码
                let params = new URLSearchParams();
                //参数：手机号，验证码（可根据自己需要自行添加）
                params.append('YourParamName1',inputInfo.phone);
                params.append('YourParamName2',inputInfo.code);
                //发送请求
                this.axios.post('xxx',params)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            qqLogin(){},
            weixinLogin(){},
            weiboLogin(){}
        },
        mounted() {
            this.countryTel = this.$route.params.tel || 86;
        }
    }
</script>

<style scoped>

</style>
