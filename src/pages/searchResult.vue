<template>
    <div>
        <nav-header></nav-header>
        <el-divider></el-divider>
        <goods-class-nav></goods-class-nav>
        <el-divider><i class="el-icon-search"></i></el-divider>
        <div class="goods-box">
            <div class="goods-list-box">

            </div>
        </div>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import NavHeader from "../components/NavHeader";
    import NavFooter from "../components/NavFooter";
    import GoodsClassNav from "../components/GoodsClassNav";
    export default {
        name: "searchResult",
        components: {GoodsClassNav, NavFooter, NavHeader},
        data () {
            return {
                query: ''
            }
        },
        mounted() {
            this.getResult();
        },
        methods: {
            getResult() {
                this.query = this.$route.params.query;
            }
        }
    }
</script>

<style scoped>

</style>
