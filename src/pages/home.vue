<template>
    <div class="home">
        <nav-header v-if="excludeRoutes.indexOf($route.name) == -1" :product-list="product_list" :recommend-list="recommend_list"></nav-header>
        <router-view></router-view>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import NavHeader from "../components/NavHeader";
    import NavFooter from "../components/NavFooter";
    export default {
        name: "home",
        components: {NavFooter, NavHeader},
        comments: {
            NavHeader,
            NavFooter
        },
        data: ()=>({
            excludeRoutes: ['person'],
            product_list: [],
            recommend_list: []
        }),
        mounted() {
            this.getHotProducts();
            this.getRecommend();
            // window.onbeforeunload = function () {
            //     var storage = window.localStorage;
            //     this.$cookie.remove("userId")
            //     storage.clear()
            //     localStorage.clear()
            // }
        },
        beforeDestroy() {

        },
        methods: {
            getHotProducts() {
                this.$axios.get('/product/hot_products.do').then(res=>{
                    console.log(res)
                    this.product_list = res.data.data
                    this.$store.dispatch('saveHotProducts', res.data.data)
                })
            },
            getRecommend() {
                if(this.$cookie.get("userId") === null) {
                    this.$axios.get('/product/get_most_hits').then(res=>{
                        console.log(res);
                        this.recommend_list = res.data.data
                    })
                } else {
                    this.$axios.post('/user/get_similarity.do', this.$qs.stringify({
                        userId: this.$cookie.get("userId")
                    })).then(res=>{
                        console.log(res)
                        if(res.data.data.msg !== "") {
                            this.recommend_list = res.data.data.data
                        }
                        if(res.data.data.length>0 ) {
                            this.recommend_list = res.data.data
                        }

                    })
                }
            },
            clearStorage() {
                this.$cookie.remove("userId")
                window.localStorage.clear();
                localStorage.clear();
                localStorage.removeItem("isLogin")
            }
        }
    }
</script>

<style scoped>

</style>
