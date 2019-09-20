<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="phone_validate">
        <bm_phone_login   v-on:accountLogin="to_account_login"
                          @parent_choose_area="to_chooseArea"
                          @parent_get_code="getCode"
                          @parent_phone_login="resetPassword"
                          :base-config="myConfig">
            <!-----------------------可以自定义内容放在header中(以下为示例)--------------------------->
            <template v-slot:header>
                <div style="display: flex;flex-direction: column;align-items: center;">
                    <h2>忘记密码</h2>
                </div>
            </template>
            <!--------------------------------初始区号：+86(建议不要改变)-------------------------->
            <template v-slot:country_tel>+{{countryTel}}</template>
        </bm_phone_login>
    </div>
</template>

<script>
    export default {
        name: "phoneValidate",
        data(){
            return{
                countryTel:"",
                myConfig: {
                    //根据需要自行修改
                    code_length:'6',
                    accountLogin:true,
                    changedPhone: false,
                    protocol: false,
                    otherLoginWays: false,
                    login_btn_value:'验证'
                }
            }
        },
        methods:{
            to_account_login(){
                //跳转到账号密码登录页面
                this.$router.push({path:'/'});
            },
            to_chooseArea(){
                // 跳转到区号选择页面
                this.$router.push({path:'/selectCode'});
            },
            getCode(tel){
                //获取验证码
                console.log("tel:"+tel);//用户输入的手机号
                let params = new URLSearchParams();
                //参数：手机号（可根据自己需要自行添加）
                params.append('tel',tel);
                //发送请求
                this.axios.post(this.baseUrl+'/sys/sms/send',params)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            resetPassword(){
                //跳转到重置密码页面
                this.$router.push({path:'/phoneValidate/resetPassword'});
            }
        },
        mounted() {
            this.countryTel = this.$route.params.tel || 86;
        }
    }
</script>
