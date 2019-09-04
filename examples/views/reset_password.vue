<template xmlns:v-slot="http://www.w3.org/1999/html">
    <div class="resetPassword">
        <bm_reset_password :base-config="myConfig"
                           :iconsBase64="myIcons"
                           @parent_finish="finish_modify">
        <!---------------------------------------自定义头--------------------------------------------------->
            <template v-slot:header>
                <h2>重置密码</h2>
            </template>>
        </bm_reset_password>
    </div>
</template>

<script>
    export default {
        name: "resetPassword",
        data(){
            return{
                //修改按钮上的文字
                myConfig:{
                    finish_btn_value: '完成'
                },
                //修改图标（默认采用base64格式）
                myIcons:{
                }
            }
        },
        methods:{
            //修改密码完成
            finish_modify(password){
                // console.log(password);
                //发送请求，提交用户输入的新密码
                let params = new URLSearchParams();
                params.append('param1',password);  //用户输入的新密码
                //...
                this.axios.post('xxx',params)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                //跳转到登录页面
                this.$router.push('/');
            }
        }
    }
</script>

<style scoped>

</style>
