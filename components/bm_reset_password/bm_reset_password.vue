<template>
    <div class="resetPassword">
        <slot name="header">
            <h2>重置密码</h2>
        </slot>
        <div class="input_wrapper">
            <div class="inputItem" :class="{'focus':isFocus.password1,'password_error':errorFlag.password1}">
                <div class="inputContent">
                    <img :src=icons.password_icon1 alt="" class="icon">
                    <input type="password" @focus="focus('password1')" @blur="blur('password1')" ref="password1" placeholder="请输入密码" v-model="input_info.password1">
                </div>
            </div>
            <div class="inputItem" :class="{'focus':isFocus.password2,'password_error':errorFlag.password2,'password_dif':errorFlag.password2_dif}">
                <div class="inputContent">
                    <img :src=icons.password_icon2 alt="" class="icon">
                    <input type="password" @focus="focus('password2')" @blur="blur('password2')" ref="password2" placeholder="再次输入密码" v-model="input_info.password2" @keyup="validatePassword()">
                </div>
            </div>
        </div>

        <div>
            <button :class="{'opt_button':!isLoginForbidden,'forbidden':isLoginForbidden}" @click="clickFinish()">
                {{mConfigs.finish_btn_value}}
            </button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "bm_reset_password",
        data(){
            return{
                input_info:{
                    password1:"",
                    password2:""
                },
                isFocus:{
                    password1:false,
                    password2:false
                },
                errorFlag:{
                    password1:false,
                    password2:false,
                    password2_dif:false
                },
                timer:false,
                isLoginForbidden:true,
                hideFooter:true,
                docmHeight: document.documentElement.clientHeight || document.body.clientHeight,
                showHeight: document.documentElement.clientHeight || document.body.clientHeight,
            }
        },

        watch: {
            //监听显示高度
            showHeight:function() {
                this.hideFooter = this.docmHeight <= this.showHeight;
            },
            //监听输入框输入内容
            input_info:{
                deep:true,
                handler:function(newValue,oldValue){
                    if (newValue){
                        this.isLoginForbidden = (!(newValue.password1 !== "" && newValue.password2 !== ""));
                    } else if (oldValue) {
                        this.isLoginForbidden = false;
                    }
                }
            },

        },

        props:['baseConfig','iconsBase64'],
        computed:{
            //合并父组件的传入值与默认值
            mConfigs(){
                return Object.assign({
                    finish_btn_value:'完成'
                },this.baseConfig)
            },
            icons(){
                return Object.assign({
                    password_icon1:"data:image/png;base64,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",
                    password_icon2:"data:image/png;base64,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",
                    password_blur:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAWAUlEQVR4Xu1dfZBcVZU/53U3MyF8LFEGRAIGCSxmSHe/e0UXsWQV+QgIaC2ygoBQuMUqyleJwrIGcEFQVAQLUJaSlQASdzWyEASWQkV0l9z7enoywUhAPqIsm6xAYoLMTPc7W3ersYaQydz7ut/r93FuVf7JnHPvOb9zf33Oe+9+IHBjBBiBaRFAxoYRYASmR4AJwrODEdgGAkwQnh6MABOE5wAjEA0BziDRcGOtgiDABClIoNnNaAgwQaLhxloFQYAJUpBAs5vREGCCRMPNWWvVqlVzxsfH3xWG4ds8z5tLRHMBYA8imgMAO5l/iPhm0zER/S8AbASADYj4IgA8DwBrEXEtET0zODj42IIFC8z/c4sZASZIjABrrQURLULERQBwEAB4PRouBID/AoB7S6XS8lqt1uhRv9zNFggwQXo8JbTWBxDRaQDwMUTcq8fdT9fds4h4BxHdJoT4dUJjFmIYJkgPwrx27dpZ69atO4uIzkDE4R502U0XowBw69DQ0E1z5879UzcdsS4AE6SLWdBsNme32+2ziegCANi1i67iUF0HANcMDQ19i4kSHV4mSETsgiD4fBiGFyHizhG7SErtJUS82vf9q5MaME/jMEEco6mUOgERvwIAb3NU7as4Ef0WAC6QUi7rqyEZG5wJYhkwrfVCIroBEd9jqZJWsZ8h4qd83388rQamyS4miEU0lFIXAcCXELFkIZ56ESJqAcAXpJRfS72xfTaQCbKNAKxZs2anjRs3fh8AjupznOIa/u6BgYGTh4eHN8U1QNb7ZYJME8GxsbHdx8fHHwGAfbMe5BnsfxwRD/V9f33O/YzkHhNkK7AFQbB3GIaPIKJZDpL7RkRPl0ql99fr9Wdy76yjg0yQLQBrNpv7t1qtnwPAkCOWWRc3300O5S/xrw8jE2QKHiMjI/VWq/VwH75tbAaA9UT0P8YcRNyt8+FxdpKsI6INnue9z/f9ZpLjpnksJkgnOlpr86zxywS+iP+IiP4VAFYPDAysP/DAA9dua4KsXLly7vj4+K6IaNZ4mW8wx8U8odZXKpV3L1y40Hw3KXxjggBAEAS7hmGo43jmIKJXAeAnnuctLZVKd1erVZMtIjezvGVyctKQ5KOIeCQADETubBpFInpq1qxZB/GSel6LBatXr95x8+bNvwCAhT2eaOat0GXlcvnWbkkxnV1jY2M7TExMnB6G4Rdf20vSKx+IqFGpVN4bl+29sjPufgqfQbTW9wGA+SXuSTN1vFmKMjQ09I2kFgmarNJqtc4los/1+PnpR0KIj/QEmIx2UmiCKKXOQcRrexE7IvoTIn7L87wr6/X6y73o07WP0dHRXSYnJy8morMRcdBVf2vyRPRpKeUNvegri30UliCdtVUKESs9CNwaAFgkhHiyB3113UXnhcNyAJjfdWcAE4hYL+rarUIShIg8rbX5grx/txOo80bqNCnlK9321Ut9pdT2iHgnABzbg35Hfd+vI6LZ6luoVkiCKKUuQMRruok0EU0i4oVCiJ6UaN3Ysi3dIAjOD8PwakQsdzMGEZ0jpbyumz6yqFs4gqxcuXK38fHxpxFxVtSAEdELpVLp2Hq9viJqH0nqBUHwV0T0426+8RDRH2fPnj3vgAMO+EOStvd7rMIRRCm1FBFPiAo8EW0slUqyXq+b547MtJGRkf1ardZj3bzlIqI7pJQnZ8bpHhhaKIKYpSTtdjvoArfQ87wP1Ov1n3bRR99UtdbvB4AHuzl+qFQqDddqtVV9cyLhgQtFEKXUsi6XapyX9meOmeZPt89f5qWElDJyBp7JvrT9vTAE6bz6fMKsBYwYhCVCiFMi6qZKTSl1KyKas7uiNPI8b/+slZhRHDU6USdL1PH6pqeUuh0RT4powArf9w9GRLNVNfONiMpa60cR0Zz2GKXdKoQ4PYpi1nQKQRDz5mpiYuKFqMHxPG9e3jYTdTJq5BcN5XJ5t2q1avaQ5LoVgiBa6/MA4OsRI3mDEOLTEXVTraa1/g4AfDKKkUR0rpTym1F0s6RTCIIopcxSdt81MGapeqVS2Tuvv5Sdb0LPRFy3tUIIEbVEcw1F3+RzT5Bmszmv1WpF3fxzpRDiH/oWnQQG1lqbQ/A+F2UoItpXSvlUFN2s6OSeIOZMK0S80jUgZtn6zjvvvNf8+fPNPR25beZoow0bNjwX5QOiWV4vpexqyU7agc09QbTW5sPYYa6BIKKrpJTmwLjcN621Obf3wgiO3ieEMHef5LblmiBjY2PbjY+PmwzgvC2ViN4tpTSX1OS+ddZqmf34Ts08owkhdkDEtpNihoRzTZDO0oqHXONBRH+QUv7/dWhFaUqp9VG27SKiOQXFHJOUy5ZrggRBcCURRSmTbhZC/F0uIz6NU1rrWwDgDFefEfFy3/cXu+plRT7XBFFK3Y+Ih7sGg4iOkVLe66qXZflGo3FcGIbOVyMQ0XIp5dFZ9n1btuedIL9FxHkuwTN7ywFgZynlpIte1mU718iZvfTbufhCRE9IKbvemekyZpKyuSWI2VYbBIHzwyMRPSalfFeSQUjLWFE+qBJRWwixXV634+aWIJ0zdle7Tj4iWial/LCrXh7klVL3IKJzuZTnD4a5JUij0Tg0DMOHI0zc3K69mgmLqGuzPM87pF6vPzpT/1n8e24JorX+EADcHSEolwghroigl3kVrfWlAOD8RgoRF/m+bw7gy13LM0HM3uklESJ2hhDiuxH0Mq+itTavtr8dwZEThRBLI+ilXiW3BAmC4CwiujFCBI4UQtwfQS/zKlrrYwDg310dQcQzfd8331Fy13JLkKh7r0ulkl+r1Rq5i7SFQ1prAQDKQnRLkczv1Z/O59wSRGttlnCbpdyurSqEGHVVyoN8EARVIhpx9SXPq3qZIG+cDUwQR4YwQRwBS4M4ZxD3KHAGeSNmnEE4g/wZASYIE8TmZ5VLLBuUpshwieUIWBrEucRyjwJnEM4gNrOGM4gNSpxBHFFKmThnEPeAcAbhDGIzaziD2KDEGcQRpZSJcwZxDwhnEM4gNrOGM4gNSpxBHFFKmThnEPeAcAbhDGIzaziD2KDEGcQRpZSJcwZxDwhnEM4gNrOGM4gNSpxBHFFKmThnEPeAcAbhDGIzaziD2KDEGcQRpT6JN5vNPdvt9u6IuMNUE9rt9omIeFYEs77qed7zEfQyrxKG4R5R7gohoptKpdJdUwEgok2lUumFarX6uywDk5nl7iMjI29ttVrHIuJRRLQPABhSvCnL4BfFdnMYOACYOyKfBACz39+cPfbfWfA/1QRpNBq1TiY4CgCqWQCUbbRDwGzt9TzPHBV0l+/7TTut5KVSSRBzKuLk5ORViHh88pDwiH1A4IelUumiWq1m7rFPVUsVQUwZ1W63v0REpyJiKVVIsTGxImDO+AWA73qet9j3/dQ8A6aGIEopcybsDxBxVqyR4M7TjsBmIjoxLddP9J0gRIRBEHwJAC4GgL7bk/bZUxD7iIgulVJe3m9/+zohlVLbI+IPAeCIfgPB46cSgXs62eSVflnXN4IEQbB3GIbmBqjcXr7Sr6DmaVwiMldYHCGlfK4ffvWFIKtXr95x06ZNChH364fTPGa2ECCi31QqFVGtVjcnbXniBDHPHFrrhxDxr5N2lsfLNAL3+b5/NCJSkl4kThCt9dcB4LwkneSxcoPAV4UQFybpTaIE0VpHvbMjSUx4rHQjkOhdJIkRJAiCXcMwfA4RB9ONP1uXcgQ2VyqVuQsXLnwpCTsTI4hS6saIq2unw+E/EPFnYRi+gIi/8zzv1amCiDhERGZ1KreYEUDE54lo3dRhwjAcJKI9Pc/bnYgOBYAP9MoMIrpeSvnZXvW3rX4SIYjWel8AWNOtQ0RkVoB+sVKp3NmPNxrd2l9k/bGxsR0mJiY+TkSXAcBQt1iUy+V9qtXq0932M5N+IgRRSi1FxBNmMmaGv182Z86cq+bNm/e6TNFln6yeMAJr166dtW7duks6Kye6Gf12IcTHu+nARjd2goyMjCxot9tjNsZMI7PZ87yP1uv15V30waopQyAIgmPDMPx+N2vvyuXyX1ar1d/E6VrsBNFam2uFzfXCzo2IXi2XywcX9c5AZ8AypqCU8gHg0agvbohocdzrtWIniFKqgYi1CLEzC9Y+lJZVnRHsZxULBLq4zx6IKJBSmotHY2uxEmRsbGz38fHxqFsrbxZCmHu7ueUcAa21uZf+E1HcNG8q49y+GytBtNZnA8D1ro4T0R8BYK6UcoOrLstnDwGl1JsB4FlE3N7VekT8e9/3b3LVs5WPlSBKqQcQ8YO2xrwmR0TnSim/6arH8tlFIAiCzxPRVa4eENFyKaXZbBdLi5sg6xHR/DpYNyJqDQ4Ozh4eHp6wVmLBzCPQbDZnt1qtjQDguThjvo1JKWP7IBwrQbTWoesuQSJ6VEp5iAtILJsPBLTWjwHAOx29ISGEE6lc+o+NIGbt1ZbLDywN+7YQIsqBb5bds1haEdBa3wIAZ7ja53neLvV6/WVXPRv5OAnyDiJaZWPEFjKXCSEifTeJMBarpAgBrfUVUb6we563X71e73op09agiJMg7yOin7riH/dbCVd7WD45BIIg+AwRXec6IiIe7Pv+r1z1bORjI4hS6nBENMdMOjVEPNX3/duclFg4FwgEQXAqEf2LqzOe5x1er9cfdNWzkWeC2KDEMokgwASxgJkziAVIORVhglgElgliAVJORZggFoFlgliAlFMRJohFYJkgFiDlVIQJYhFYJogFSDkVYYJYBJYJYgFSTkWYIBaBZYJYgJRTESaIRWCZIBYg5VSECWIRWCaIBUg5FWGCWAS2iARRSh3ied57iKhuIEJEs4//kXq9/ksLyHIjwgSxCGWRCNJoNP4iDMMbAeBvp4Fmied5n4lrKbdFOBIVYYJYwF0UgoyOju4yMTExioh7bgsWInpu1qxZ9QULFrxoAV+mRZggFuErCkGUUssQ8TgLSIzIUiHEiZaymRVjgliErggEiXJWcdzH21iEJnYRJogFxEUgiFLqTES82QKOP4sQ0SeklM57JVzG6LcsE8QiAkUgiNZ6CQCYy4Rc2q1CiNNdFLImywSxiFhBCDICAFULOKZmkNiP2XSxJw5ZJogFqkUgiFLKvL060AKOqSKjQggnUjn233dxJohFCJgg04LEBJkGGt6TbkGsLIlwBtl6tDiDWMxiziCcQSymyetEOIO4IpZyec4gnEGAz8WanqVMECYIE2QbWYwJwgRhgjBBnAtdfki3gIwf0vkh3WKa8EO6K0hZkucSi0ssLrG4xHL+zeISywIyLrG4xLKYJlxiuYKUJXkusbjE4hKLSyzn3ywusSwg4xKLSyyLacIllitIWZLnEotLLC6xuMRy/s3iEssCMi6xuMSymCZcYrmClCV5LrG4xOISi0ss598sLrEsIOMSi0ssi2nCJZYrSFmS5xKLSywusbjEcv7N4hLLAjIusbjEspgmXGK5gpQleS6xuMTiEotLLOffLC6xLCArQomltVYAICzgmCqyQghxkKNOpsSZIBbhKghBvgcAp1jAMVWED6+eBjA+F8txJqVdPAiC84noay52EtE5UsrrXHSyJssZxCJiRcggQRDsGobhakScYwGJEXnJ87x98n5XIRPEYjYUgSAGhkajcVwYhsssIDG33h7n+/7dNrJZlmGCWESvKAQxUCilLkDEa2aA5XwhxDcsoMu8CBPEIoRFIoiBo9lsDrdarWuJ6GBEnGX+j4heQcT/BICzhRC/toAtFyJMEIswFo0gUyEJguAdYRiGUsrVFlDlToQJYhHSIhPEAp5cizBBLMLLBLEAKaciTBCLwDJBLEDKqQgTxCKwTBALkHIqwgSxCCwTxAKknIowQSwCywSxACmnIkwQi8AyQSxAyqkIE8QisEwQC5ByKsIEsQgsE8QCpJyKMEEsAssEsQAppyKFIkgQBIcR0YMRYnmKEGJJBD1WyTgCUQmCiIf5vv9QHO5jHJ2aPrXWZkup2Vrq1BDxs77vX++kxMK5QEApdQ4iXuvqTKlU8mu1WsNVz0Y+NoIEQbAHEf3exoipMkT0T1LKf3TVY/nsI6CU+jIifsHVk4GBgbcMDw+/4KpnIx8bQTpZJAQApzGI6MdSyuNtjGeZfCGglLoXERc5ekVCCM9Rx1rcafJa99oRVEq9gIi7OeptFkLs4KjD4hlHgIi8IAg2AsBsR1d+L4TY01HHWjxugjQQsWZtTUcQEQ/2ff9Xrnosn10EtNbvBYCfR/BACSHeGUHPSiVugtyMiGdaWTJFiIi+J6U8zVWP5bOLgFLqDkT8mKsHRHSjlPJTrnq28nET5GhEvMfWmClyYalUWlir1VZF0GWVjCHQaDRqYRhGegtFREdIKR+Iy+W4CVIBgJcRcfsIDjxeLpcPqlarmyPoskpGEFBKbY+IIwAw39VkItoohNgFEc3LoFharAQxFiulfoCIfxPR+vt93z8KESmiPqulGAEiQq31/Yj4wShmEtGdUsqTouja6iRBkJMQ8XZbg7Yit0QI4XpMZxfDsWpSCER97phi34lCiKVx2hs7QdasWTOwYcOGZyO87p3q94rBwcEjFyxY8GKcYHDfySBgTpYkonsBoJu3T+t22mmnvebPnz8ep9WxE8QYr7X+JAB8p0tH1puv7ABg3lpMdtkXq/cBgbGxse0mJibODsPwYkR8UzcmmLejvu/f0k0fNrqJEKTzLGLOot3fxqgZZEw2uiMMw+VSyl/0oD/uImYEzDcOIjJfyE9GxLk9GO5xIcSCHvQzYxeJEURr/REA+LcZLXIXMOu91gJArKnW3axiaxDRjp2y+q29RiLJs4oTI0in1FoBALLXgHF/xUGAiAIppevlQ5EBSpQgzWZz/1arZZbA81qryCErtOKmUqkkarXaE0mhkChBjFONRmNRGIbmDQY3RsAFAfMtbJEQ4icuSt3KJk6QTql1KQAs7tZ41i8UApcIIa5I2uO+EMQ4qZS6BxGPTtphHi97CBDRMinlh/thed8I0vmAeBsintAPx3nMzCBw18DAwKnDw8MT/bC4bwR5zVmt9YUA8GUAiG1XWD+A5TG7RsAsQLxICPGVrnvqooO+E8TYHgTBUURk1tTw260ugpkXVbNKFwCOl1I+3G+fUkGQDknMIQ+LiegMRCz3GxgeP3kEiKgFAP9cqVQWV6vVdclb8MYRU0OQ10xTSr0dEa8EAPNskjr70hC0HNpgXuHeVS6XL65Wq0+nyb/UTsCRkZF6u92+HACOSRNgbEvPEbibiC6RUq7sec896DC1BHnNt2azOXtyctJsqDFEWYSIb+mB39xF/xB4noiWI+Lycrn8QNp3jKaeIFvGUSnle543DABvD8NwPiLuCwDm3y79izmPvBUEXgKAJ4noSc/z1gDAU4g4Wq/XzfbazLTMESQzyLKhuUCACZKLMLITcSHABIkLWe43FwgwQXIRRnYiLgSYIHEhy/3mAgEmSC7CyE7EhQATJC5kud9cIMAEyUUY2Ym4EGCCxIUs95sLBP4P2HYMbn/PW4kAAAAASUVORK5CYII=",
                    password_active:"data:image/png;base64,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",
                },this.iconsBase64)
            }
        },

        mounted() {
            this.phoneNum = this.$route.params.tel;
            //监听事件
            window.onresize = ()=>{
                return(()=>{
                    this.showHeight = document.documentElement.clientHeight || document.body.clientHeight;
                })()
            }
        },
        methods:{
            clickFinish(){
                let that = this;
                //发送请求
                if (!this.errorFlag.password1 && !this.errorFlag.password2 && !this.errorFlag.password2_dif) {
                    this.$emit('parent_finish',this.input_info.password1);
                }
            },
            focus(type){
                if (type === "password1"){
                    this.isFocus.password1 = true;
                    this.icons.password_icon1 = this.icons.password_active;
                    this.icons.password_icon2 = this.icons.password_blur;
                    this.errorFlag.password1 = false;
                    this.errorFlag.password2_dif = false;
                } if (type === "password2"){
                    this.isFocus.password2 = true;
                    this.icons.password_icon2 = this.icons.password_active;
                    this.icons.password_icon1 = this.icons.password_blur;
                    this.errorFlag.password2 = false;
                }

            },
            blur(type){
                if (type === "password1") {
                    this.isFocus.password1 = false;
                    this.icons.password_icon1 = this.icons.password_blur;
                    //判空
                    let password1_value = this.$refs.password1.value;
                    this.errorFlag.password1 = password1_value === "" || password1_value === null || password1_value === undefined;
                } if (type === "password2"){
                    this.isFocus.password2 = false;
                    this.icons.password_icon2 = this.icons.password_blur;
                    //判空
                    let password2_value = this.$refs.password2.value;
                    this.errorFlag.password2 = password2_value === "" || password2_value === null || password2_value === undefined;
                }
            },
            //验证两次输入密码是否一致
            validatePassword(){
                let password1 = this.$refs.password1.value;
                let password2 = this.$refs.password2.value;
                this.errorFlag.password2_dif = password1 !== password2;
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
    .resetPassword{
        width: 80%;
        margin: 33% auto;
        text-align: center;
        h2{
            color: #666666;
            font-size: 1.6rem;
        }
        //用户名、密码输入框
        .input_wrapper{
            .phone_number{
                display: flex;
                flex-direction: row;
                font-size: 1.2rem;
                font-weight: bold;
            }
            .inputItem{
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: flex-end;
                position: relative;
                margin-top: 2rem;
                &::after{
                    content: "";
                    position: absolute;
                    height: 1px;
                    width: 100%;
                    bottom: 0;
                    transform: scaleY(.5);
                    background: #bfbfbf;
                }

                .inputContent{
                    padding: .4rem;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: flex-end;
                    .icon{
                        width: 1.32rem;
                        height: 1.32rem;
                        margin-right: 1.2rem;
                    }
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
                }
            }
            .focus::after{
                background: @mainColor;
            }
            .password_error::after{
                content: '密码不能为空';
                .error();
            }
            .password_dif::after{
                content: '两次密码输入不一致';
                .error();
            }
        }
        //完成按钮
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
            margin-top: 14%;
            font-size: 1.111rem;
            overflow: hidden;
            letter-spacing: .6rem;
            text-indent: .6rem;
            text-align: center;
            outline: 0;
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

    }
</style>
