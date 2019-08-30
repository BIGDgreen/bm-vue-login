<template>
    <div class="phoneLogin">
        <slot name="header">
            <h2>手机登录</h2>
        </slot>
        <div class="input_wrapper">
            <div class="inputItem" :class="{'focus':isFocus.phoneNum,'phone_empty':errorFlag.phone_empty,'phone_error':errorFlag.phone_err}">
                <span class="chooseArea" @click="chooseArea()">
                    <slot name="country_tel">+86</slot>
                    <span><svg t="1566640213388" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2787" width="18" height="18"><path d="M512 721.5c-4.6 0-9.2-1.8-12.7-5.3l-383.1-383c-7-7-7-18.4 0-25.5s18.4-7 25.5 0L512 678.1l370.3-370.3c7-7 18.4-7 25.5 0 7 7 7 18.4 0 25.5l-383.1 383c-3.5 3.5-8.1 5.2-12.7 5.2z" p-id="2788"></path></svg></span>
                </span>
                <div class="inputContent">
                    <input type="text" @focus="focus('phoneNum')" @blur="blur('phoneNum')" ref="phoneNum" placeholder="请输入手机号" v-model="input_info.phone" @keyup="inputPhone" maxlength="13" autofocus>
                </div>
            </div>
            <div class="inputItem" :class="{'focus':isFocus.code,'code_empty':errorFlag.code_empty,'code_error':errorFlag.code_err}">
                <div class="inputContent">
                    <input id="input_code" @focus="focus('code')" @blur="blur('code')" ref="code" placeholder="请输入验证码" v-model="input_info.code" :maxlength="mConfigs.code_length">
                </div>
                <input type="button" value="获取验证码" class="getCodeBtn" @click="getVerifyCode()" ref="getCode" disabled>
            </div>
        </div>
        <div>
            <button :class="{'opt_button':!isLoginForbidden,'forbidden':isLoginForbidden}" @click="login()">登录</button>
        </div>
        <button v-if="mConfigs.accountLogin" class="accountLogin" @click="$emit('accountLogin')">
            用账号密码登录
        </button>
        <div class="tips">
            <div v-if="mConfigs.changedPhone" class="changedPhone" @click="$emit('changedPhone')">
                手机号已更换
            </div>
        </div>

        <div class="otherLoginWays" v-if="mConfigs.otherLoginWays" v-show="hideFooter">
            <div class="otherWayTextWrapper">
                <div class="otherWayText">其他登录方式</div>
            </div>
            <div class="icons">
                <slot name="otherLoginWays_icons">
                    <img class="icon" src="../assets/images/icon_QQ.png" @click="$emit('qq_login')" alt="qqLogin">
                    <img class="icon" src="../assets/images/icon_weixin.png" @click="$emit('weixin_login')" alt="weixinLogin">
                    <img class="icon" src="../assets/images/icon_weibo.png" @click="$emit('weibo_login')" alt="weiboLogin">
                </slot>
            </div>
        </div>

        <div class="protocol" v-if="mConfigs.protocol" v-show="hideFooter">
            登录注册即代表阅读并同意<span @click="$emit('toProtocol')">用户服务协议</span>
        </div>

    </div>
</template>

<script>
    // 按需引入部分组件
    import { Toast } from 'mint-ui';
    import 'mint-ui/lib/style.css'

    export default {
        name: "bm_phone_login",
        data(){
            return{
                //用户输入信息
                input_info:{
                    phone:"",
                    code:"",
                },
                //倒计时
                countDownTime:60,
                timeOut:true,
                //聚焦（切换样式）
                isFocus:{
                    phoneNum:false,
                    code:false
                },
                //错误信息
                errorFlag:{
                    phone_empty:false,
                    phone_err:false,
                    code_empty:false,
                    code_err:false
                },
                //登录按钮禁用
                isLoginForbidden:true,
                //解决安卓输入框将fixed布局顶上的问题
                hideFooter:true,
                docmHeight: document.documentElement.clientHeight || document.body.clientHeight,
                showHeight: document.documentElement.clientHeight || document.body.clientHeight,
            }
        },

        watch: {
            //监听显示高度
            showHeight:function() {
                this.hideFooter = this.docmHeight <= this.showHeight;
            }
        },

        props:['baseConfig'],
        computed:{
            //合并父组件的传入值与默认值
            mConfigs(){
                return Object.assign({
                    accountLogin:true,
                    changedPhone: true,
                    protocol: true,
                    otherLoginWays: true,
                    code_length:'4'
                },this.baseConfig)
            }
        },

        mounted() {
            //监听事件
            window.onresize = ()=>{
                return(()=>{
                    this.showHeight = document.documentElement.clientHeight || document.body.clientHeight;
                })()
            }
        },

        methods:{
            inputPhone(){
                let value = this.input_info.phone.replace(/\D/g, '').substr(0, 11); // 不允许输入非数字字符，超过11位数字截取前11位
                let len = value.length;
                if (len > 3 && len < 8) {
                    value = value.replace(/^(\d{3})/g, '$1 ')
                } else if (len >= 8) {
                    value = value.replace(/^(\d{3})(\d{4})/g, '$1 $2 ')
                }
                this.input_info.phone = value;
            },

            chooseArea(){
                this.$refs.phoneNum.blur();
                setTimeout(()=>{
                    this.$emit('parent_choose_area');
                },500);
            },

            focus(type){
                this.isLoginForbidden = true;
                if (type === "phoneNum"){
                    this.isFocus.phoneNum = true;
                    this.errorFlag.phone_empty = false;

                } if (type === "code"){
                    this.isFocus.code = true;
                    this.errorFlag.code_empty = false;
                }

            },
            blur(type) {
                if (type === "phoneNum") {
                    this.isFocus.phoneNum = false;
                    //判空
                    let phone_num = this.input_info.phone;
                    this.errorFlag.phone_empty = phone_num === "" || phone_num === null || phone_num === undefined;
                    //判断手机号格式是否正确
                    // let intelnational_tel = /^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/;
                    this.errorFlag.phone_err = !(/^1[3456789]\d\s\d{4}\s\d{4}$/.test(phone_num)) && !this.errorFlag.phone_empty;

                    if (this.errorFlag.phone_empty || this.errorFlag.phone_err){
                        //如果手机号为空或不合法，则禁用获取验证码按钮
                        this.$refs.getCode.setAttribute("disabled","disabled");
                    }
                }
                if (type === "code") {
                    this.isFocus.code = false;
                    //判空
                    let code = this.$refs.code.value;
                    this.errorFlag.code_empty = code === "" || code === null || code === undefined;
                }
                if (!(this.errorFlag.phone_empty || this.errorFlag.phone_err) && this.timeOut) {
                    this.$refs.getCode.removeAttribute("disabled");
                }
                this.isLoginForbidden = this.errorFlag.phone_empty || this.errorFlag.phone_err || this.errorFlag.code_empty;
            },
            /**************************************************************获取验证码**************************************************************/
            getVerifyCode(){
                let that = this;
                let input_phone = this.input_info.phone.replace(/\s*/g,"");      //去除空格
                this.$emit('parent_get_code',input_phone);
                this.timeOut = false;
                //倒计时
                if (!this.errorFlag.phone_err && !this.errorFlag.phone_empty){
                    Toast({
                        message: '验证码已发送',
                        position: 'middle',
                    });
                    let clock = window.setInterval(()=>{
                        that.countDownTime--;
                        that.$refs.getCode.value = this.countDownTime + "s后可重新获取";
                        that.$refs.getCode.setAttribute("disabled","disabled");
                        if(that.countDownTime <= 0){
                            window.clearInterval(clock);
                            that.countDownTime = 60;
                            that.timeOut = true;
                            that.$refs.getCode.removeAttribute("disabled");
                            that.$refs.getCode.value = "获取验证码";
                        }
                    },1000)
                } else {
                    that.errorFlag.phone_empty = true;
                }
            },
            /***************************************************登录****************************************************/
            login(){
                this.input_info.phone = this.input_info.phone.replace(/\s*/g,"");      //去除空格
                this.$emit('parent_phone_login',this.input_info);
            }
        }
    }
</script>

<style lang="less" scoped>
    @mainColor: #007cdc;
    .gradient{
        background-image: linear-gradient(to right,@mainColor,lighten(@mainColor,18%));
    }
    .error{
        background: red;
        transform: scaleY(1);
        font-size: .72rem;
        color: red;
        text-align: right;
        line-height: 1.6rem;
    }
    .phoneLogin{
        width: 80%;
        margin: 33% auto;
        text-align: center;
        h2{
            color: #666666;
            font-size: 1.6rem;
        }
        //弹窗
        .toast {
            position: fixed;
            z-index: 2000;
            left: 50%;
            top:45%;
            transition:all .5s;
            transform: translateX(-50%) translateY(-50%);
            text-align: center;
            border-radius: 5px;
            color:#FFF;
            background: rgba(17, 17, 17, 0.7);
            height: 45px;
            line-height: 45px;
            padding: 0 15px;
            max-width: 150px;
        }
        //用户名、密码输入框
        .input_wrapper{
            .inputItem{
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                position: relative;
                margin-top: 1.42rem;
                &::after{
                    content: "";
                    position: absolute;
                    height: 1px;
                    width: 100%;
                    bottom: 0;
                    transform: scaleY(.5);
                    background: #bfbfbf;
                }

                .chooseArea{
                    display: flex;
                    align-items: center;
                    span{
                        margin-left: .2rem;
                        margin-top: 7.2%;
                    }
                }

                .inputContent{
                    padding: .4rem;
                    input{
                        font-size: 1.11rem;
                        border: none;
                        outline: none;
                        width: 90%;
                        letter-spacing: .1rem;
                        &::placeholder{
                            color: #aaaaaa;
                        }
                    }

                    #input_code{
                        text-align: center;
                        letter-spacing: 1rem;
                        &::placeholder{
                            letter-spacing: .1rem;
                        }
                    }
                }
                .getCodeBtn{
                    background: white;
                    color: @mainColor;
                    border: .5px @mainColor solid;
                    border-radius: 6px;
                    padding: .3em;
                    outline: none;
                    &:active{
                        background: #f1f1f1;
                    }
                    &:disabled{
                        background: tint(@mainColor,90%);
                        color: fade(@mainColor,40%);
                        border: #f2f2f2;
                    }
                }
            }
            .focus::after{
                background: @mainColor;
            }
            .phone_empty::after{
                content: '手机号不能为空';
                .error();
            }
            .phone_error::after{
                content: '请填入正确的手机号';
                .error();
            }
            .code_empty::after{
                content: '验证码不能为空';
                .error();
            }
            .code_error::after{
                content: '验证码错误';
                .error();
            }
        }
        //登录按钮
        button{
            .gradient;
            border: none;
            outline: none;
            width: 100%;
            position: relative;
            color: white;
            border-radius: 1.2rem;
            padding-top: .42rem;
            padding-bottom: .42rem;
            margin-top: 10%;
            font-size: 1.111rem;
            overflow: hidden;
            letter-spacing: .6rem;
            text-indent: .6rem;
            text-align: center;
        }
        //账号密码登录
        .accountLogin{
            letter-spacing: .1rem;
            background: white;
            border: .8px solid @mainColor;
            color: @mainColor;
            margin-top: 5%;
            &:active{
                background: fade(@mainColor,8%);
            }
        }
        .opt_button{
            cursor: pointer;
            &::after{
                content: "";
                background: #fff;
                display: block;
                position: absolute;
                width: 200%;
                height: 200%;
                top: -5%;
                border-radius: 50px;
                margin-left: -80%;
                opacity: 0;
                transition: all 0.75s ease-in-out;
            }
            &:active::after {
                width: 0;
                opacity: 0.6;
                transition: 0s;
            }
        }
        .forbidden{
            background: tint(@mainColor,70%);
            color: fade(white,80%);
        }

        .tips{
            font-size: .8rem;
            margin-top: .4rem;
            text-align: right;
            .changedPhone{
                margin-right: .2rem;
                color: #2986de;
            }
        }

        /*********************第三方登录******************/
        .otherLoginWays{
            width: 80%;
            position: fixed;
            bottom: 8.2%;
            left: 10%;
            right: 10%;
            text-align: center;
            .otherWayTextWrapper{
                line-height: 0;
                &:before,&:after{
                    position: absolute;
                    background: #ddd;
                    content: "";
                    height: 1px;
                    width: 30%;
                }
                &:before{
                    left: 0;
                }
                &:after{
                    right: 0;
                }
                .otherWayText{
                    font-size: .8rem;
                    color: #bbbbbb;
                }
            }
            .icons{
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                margin-top: 1.4em;
                img{
                    width: 2rem;
                    height: 2em;
                }
            }
        }

        .protocol{
            position: fixed;
            bottom: 4%;
            left: 2%;
            right: 2%;
            font-size: .72em;
            margin-top: 8%;
            color: #333333;
            span{
                color: #2986de;
            }
        }
    }
</style>
