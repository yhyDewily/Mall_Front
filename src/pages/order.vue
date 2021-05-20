<template>
    <div>
        <router-view></router-view>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import NavFooter from "../components/NavFooter";
    export default {
        name: "order",
        components: {NavFooter},
        mounted() {
            // window.onbeforeunload = function () {
            //     var storage = window.localStorage;
            //     this.$cookie.remove("userId")
            //     storage.clear()
            //     localStorage.clear()
            // }
        }
    }
</script>

<style scoped>

</style>
