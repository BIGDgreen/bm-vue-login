<template>
    <div class="select_code">
        <bm_select_code v-on:choose="selectCountry($event)"></bm_select_code>
    </div>
</template>

<script>
    export default {
        name: "select_code",
        data(){
          return{
              lastRouter:""
          }
        },
        beforeRouteEnter(to,from,next){
            next(vm => {
                //获取上一个页面的名称
                vm.lastRouter = from.name;
            })
        },
        methods:{
            selectCountry(event){
                let country_tel = event.tel;
                this.$router.push({name:this.lastRouter,params:{tel:country_tel}});
            }
        },

    }
</script>

<style scoped>

</sty
