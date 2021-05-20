<template>
    <div>
        <nav-header @getSearchResult = "handleSearch"></nav-header>
        <el-divider></el-divider>
        <goods-class-nav @getTypeResult = "getType"
                        @getGrandResult="getGrand"></goods-class-nav>
        <el-divider><i class="el-icon-search"></i></el-divider>
        <div class="container">
            <div class="goods-box">
                <div class="goods-list-box">
                    <div class="goods-list">
                        <div class="goods-show-info" v-for="(item,index) in row_1" :key="index" @click="goToProduct(item.id)">
                            <div class="goods-show-img">
                                <img :src="item.mainImage"/>
                            </div>
                            <div class="goods-show-price">
                                <span class="seckill-price">{{ item.price }}￥</span>
                            </div>
                            <div class="goods-show-detail">
                                <span class="goods-show-name">{{ item.name }}</span>
                                <span class="goods-show-subtitle">{{ item.subtitle }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="goods-list-box">
                    <div class="goods-list">
                        <div class="goods-show-info" v-for="(item,index) in row_2" :key="index" @click="goToProduct(item.id)">
                            <div class="goods-show-img">
                                <img :src="item.mainImage"/>
                            </div>
                            <div class="goods-show-price">
                                <span class="seckill-price">{{ item.price }}￥</span>
                            </div>
                            <div class="goods-show-detail">
                                <span class="goods-show-name">{{ item.name }}</span>
                                <span class="goods-show-subtitle">{{ item.subtitle }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="goods-list-box">
                    <div class="goods-list">
                        <div class="goods-show-info"
                             v-for="(item,index) in row_3"
                             :key="index"
                            @click="goToProduct(item.id)"
                        >
                            <div class="goods-show-img">
                                <img v-lazy="item.mainImage"/>
                            </div>
                            <div class="goods-show-price">
                                <span class="seckill-price">{{ item.price}}￥</span>
                            </div>
                            <div class="goods-show-detail">
                                <span class="goods-show-name">{{ item.name }}</span>
                                <span class="goods-show-subtitle">{{ item.subtitle }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page">
                <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="12"
                        layout="prev, pager, next, jumper"
                        :total="totalElements">
                </el-pagination>
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
                action: 0,
                // 0表示性别搜索
                // 1表示关键词搜索
                // 2表示品牌搜索
                // 3表示种类搜索
                query: '',
                currentPage: 1,
                row_1: [],
                row_2: [],
                row_3: [],
                orderGoodsList: [],
                page_size: 0,
                totalPages: 0,
                totalElements: 0
            }
        },
        mounted() {
            this.getResult();
            this.getGoodsList();
            window.onbeforeunload = function () {
                var storage = window.localStorage;
                this.$cookie.remove("userId")
                storage.clear()
                localStorage.clear()
            }
        },
        methods: {
            getResult() {
                this.query = this.$route.params.query;
            },
            sliceElements(val) {
                this.orderGoodsList = val.content;
                this.row_1 = this.orderGoodsList.slice(0,4);
                this.row_2 = this.orderGoodsList.slice(4,8);
                this.row_3 = this.orderGoodsList.slice(8,12);
                this.totalElements = val.totalElements;
                this.totalPages = val.totalPages;
            },
            getGoodsList(){
                if(this.query === '100001' || this.query === '100002'){
                    this.action = 0;
                    this.$axios.post("/product/sexList.do", this.$qs.stringify({
                        categoryId: this.query
                    })).then(res=>{
                        console.log(res);
                        this.sliceElements(res.data.data)
                    })
                } else {
                    this.action = 1;
                    this.$axios.post("/product/list.do", this.$qs.stringify({
                        keyword: this.query
                    }))
                        .then(res=>{
                            this.sliceElements(res.data.data)
                        })
                }
            },
            handleSearch(val){
                this.action = 1
                this.$router.push({
                    name: 'result',
                    params: {
                        query: val
                    }
                })
                this.query = val;
                this.$axios.post("/product/list.do", this.$qs.stringify({
                    keyword: val,
                    pageNum: this.currentPage
                }))
                    .then(res=>{
                        console.log(res);
                        this.sliceElements(res.data.data)
                    })
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                if(this.action === 0) {
                    this.$axios.post("/product/sexList.do", this.$qs.stringify({
                        categoryId: this.query,
                        pageNum: val
                    })).then(res=>{
                        console.log(res);
                        this.sliceElements(res.data.data)
                    })
                } else if(this.action === 1) {
                    this.$axios.post("/product/list.do", this.$qs.stringify({
                        keyword: this.query,
                        pageNum: val
                    }))
                    .then(res=>{
                        console.log(res)
                        this.sliceElements(res.data.data)
                    })
                } else if (this.action === 2) {
                    this.$axios.post("/product/grand_list.do", this.$qs.stringify({
                        grandName: this.query,
                        pageNum: val
                    })).then(res=>{
                        console.log(res)
                        this.sliceElements(res.data.data)
                    })
                } else if (this.action === 3) {
                    this.$axios.post("/product/category_list.do", this.$qs.stringify({
                        keyword: this.query,
                        pageNum: val
                    })).then(res=>{
                        this.sliceElements(res.data.data)
                    })
                }
            },
            goToProduct(val) {
                this.$axios.post('/product/product_hits', this.$qs.stringify({
                    productId: val
                })).then(res=>{
                    console.log(res)
                })
                if(this.$cookie.get("userId") !== null) {
                    this.$axios.post('/product/category_hits', this.$qs.stringify({
                        userId: this.$cookie.get("userId"),
                        productId: val
                    })).then(res=>{
                        console.log(res)
                    })
                }
                this.$router.push("/product/" + val)
            },
            getGrand(val) {
                console.log(val);
                this.action = 2;
                if(this.$route.query !== val) {
                    this.$router.push({
                        name: 'result',
                        params: {
                            query: val
                        }
                    })
                }
                this.$axios.post("/product/grand_list.do", this.$qs.stringify({
                    grandName: val
                })).then(res=>{
                    console.log(res)
                    this.sliceElements(res.data.data)
                })
            },
            getType(val) {
                console.log(val)
                this.action = 3
                this.query = val
                this.$router.push({
                    name: 'result',
                    params: {
                        query: val
                    }
                })
                this.$axios.post("/product/category_list.do", this.$qs.stringify({
                    keyword: val
                })).then(res=>{
                    console.log(res)
                    this.query = val
                    this.sliceElements(res.data.data)
                })
            }
        }
    }
</script>

<style scoped>
    .container {
        position: relative;
        width: 1226px;
        margin-left: auto;
        margin-right: auto;
    }
    .goods-list-box {
        margin-left: 15px;
        width: calc(100% - 215px);
    }
    .goods-show-img img{
        width: 220px;
        height: 220px;
    }
    .goods-list-tool ul{
        padding-left: 15px;
        list-style: none;
    }
    .goods-list-tool li{
        cursor: pointer;
        float: left;
    }
    .goods-list-tool span{
        padding: 5px 8px;
        border: 1px solid #ccc;
        border-left: none;
        line-height: 36px;
        background-color: #fff;
    }
    .goods-list-tool span:hover{
        border: 1px solid #E4393C;
    }
    .goods-list-tool i:hover{
        color: #E4393C;
    }
    .goods-list-tool-active {
        color: #fff;
        border-left: 1px solid #ccc;
        background-color: #E4393C !important;
    }

    .goods-list {
        display: flex;
        flex-wrap: wrap;
        /*justify-content: space-between;*/
    }
    .goods-show-info{
        width: 240px;
        padding: 10px;
        margin: 15px 0px;
        border: 1px solid #fff;
        cursor: pointer;
    }
    .goods-show-info:hover{
        border: 1px solid #ccc;
        box-shadow: 0px 0px 15px #ccc;
    }
    .goods-show-price{
        margin-top: 6px;
    }
    .goods-show-detail{
        font-size: 12px;
        margin: 6px 0px;
    }
    .goods-show-num{
        font-size: 12px;
        margin-bottom: 6px;
        color: #009688;
    }
    .goods-show-num span{
        color: #005AA0;
        font-weight: bold;
    }
    .goods-show-seller{
        font-size: 12px;
        color:#E4393C;
    }
    .goods-page {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
    }
</style>
