<template>
    <div class="select_code">
        <bm_select_code v-on:choose="selectCountry($event)"></bm_select_code>
    </div>
</template>

<script>
    export default {
        name: "select_code",
        methods:{
            selectCountry(event){
                let country_tel = event.tel;
                this.$router.push({name:"phoneLogin",params:{tel:country_tel}})
            }
        }
    }
</script>

<style scoped>

</sty
