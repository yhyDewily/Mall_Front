<template>
    <div>
        <nav-header @getSearchResult = "handleSearch"></nav-header>
        <el-divider></el-divider>
        <goods-class-nav></goods-class-nav>
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
                                <span class="seckill-price">{{ item.price }}</span>
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
                                <span class="seckill-price">{{ item.price }}</span>
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
                            @click="goToProduct(item.id)">
                            <div class="goods-show-img">
                                <img :src="item.mainImage"/>
                            </div>
                            <div class="goods-show-price">
                                <span class="seckill-price">{{ item.price}}</span>
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
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="100"
                        layout="prev, pager, next, jumper"
                        :total="1000">
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
                query: '',
                currentPage: 1,
                row_1: [],
                row_2: [],
                row_3: [],
                orderGoodsList: []
            }
        },
        mounted() {
            this.getResult();
            this.getGoodsList();
        },
        methods: {
            getResult() {
                this.query = this.$route.params.query;
            },
            getGoodsList(){
                if(this.query === '100001' || this.query === '100002'){
                    this.$axios.post("/product/sexList.do", this.$qs.stringify({
                        categoryId: this.query
                    })).then(res=>{
                        console.log(res)
                        this.orderGoodsList = res.data.data;
                        this.row_1 = this.orderGoodsList.slice(0,4);
                        this.row_2 = this.orderGoodsList.slice(4,8);
                        this.row_3 = this.orderGoodsList.slice(8,12);
                    })
                } else {
                    this.$axios.post("/product/list.do", this.$qs.stringify({
                        keyword: this.query
                    }))
                        .then(res=>{
                            this.orderGoodsList = res.data.data.content;
                            this.row_1 = this.orderGoodsList.slice(0,4);
                            this.row_2 = this.orderGoodsList.slice(4,8);
                            this.row_3 = this.orderGoodsList.slice(8,12);
                            console.log(this.orderGoodsList)
                        })
                }
            },
            handleSearch(val){
                this.$axios.post("/product/list.do", this.$qs.stringify({
                    keyword: val
                }))
                    .then(res=>{
                        this.orderGoodsList = res.data.data.content;
                        this.row_1 = this.orderGoodsList.slice(0,4);
                        this.row_2 = this.orderGoodsList.slice(4,8);
                        this.row_3 = this.orderGoodsList.slice(8,12);
                        console.log(this.orderGoodsList)
                    })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            goToProduct(val) {
                this.$router.push("/product/" + val)
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
