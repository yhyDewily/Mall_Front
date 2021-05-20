<template>
    <div class="order-list">
        <order-header title="订单列表">
            <template v-slot:tip>
                <span>请谨防钓鱼链接或诈骗电话</span>
            </template>
        </order-header>
        <div class="wrapper">
            <div class="container">
                <div class="order-box">
                    <div class="order" v-for="(order,index) in list" :key="index">
                        <div class="order-title">
                            <div class="item-info fl">
                                {{order.createTime}}
                                <span>|</span>
                                {{order.addressVo.recipient}}
                                <span>|</span>
                                订单号：{{order.orderNo}}
                                <span>|</span>
                                {{order.paymentTypeDesc}}
                            </div>
                            <div class="item-money fr">
                                <span>应付金额：</span>
                                <span class="money">{{order.payment}}</span>
                                <span>元</span>
                            </div>
                        </div>
                        <div class="order-content clearfix">
                            <div class="good-box fl">
                                <div class="good-list" v-for="(item,i) in order.orderItemVoList" :key="i">
                                    <div class="good-img" @click="goToProduct(item.productId)">
                                        <img v-lazy="item.productImage" alt="">
                                    </div>
                                    <div class="good-name" @click="goToProduct(item.productId)">
                                        <div class="p-name">{{item.productName}}</div>
                                        <div class="p-money">{{item.totalPrice + 'X' + item.quantity}}元</div>
                                    </div>
                                </div>
                            </div>
                            <div class="good-state fr" v-if="order.status === 10 ">
                                <a href="javascript:;" @click="goPay(order.orderNo)">{{order.statusDesc}}</a>
                            </div>
                            <div class="good-state fr" v-else>
                                <a href="javascript:;">{{order.statusDesc}}</a>
                            </div>
                            <div class="good-state fr" v-if="order.status === 40">
                                <a href="javascript:;" @click="confirmShip(order.orderNo)">确认收货</a>
                            </div>
                        </div>
                    </div>
                    <el-pagination
                            style="text-align: right"
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="5"
                            layout="prev, pager, next, jumper"
                            :total="totalElements">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import OrderHeader from './../components/OrderHeader'
    import { Pagination,Button } from 'element-ui'
    // import infiniteScroll from 'vue-infinite-scroll'
    export default{
        name:'order-list',
        components:{
            OrderHeader,
            [Pagination.name]:Pagination,
            [Button.name]:Button
        },
        directives: {
            // infiniteScroll
        },
        data(){
            return {
                loading:false,
                list:[],
                currentPage:1,
                totalElements:0,
                totalPages: 0
            }
        },
        mounted(){
            this.getOrderList();
        },
        methods:{
            sliceElements(val) {
                this.list = val.content;
                this.totalElements = val.totalElements;
                this.totalPages = val.totalPages;
            },
            getOrderList(){
                console.log(this.$route.path)
                this.$axios.post("/order/list.do", this.$qs.stringify({
                    userId: this.$cookie.get("userId")
                })).then(res=>{
                    console.log(res)
                    this.sliceElements(res.data.data)
                })

            },
            goPay(orderNo){
                console.log(orderNo)
                // 三种路由跳转方式
                // this.$router.push('/order/pay')
                /*this.$router.push({
                  name:'order-pay',
                  query:{
                    orderNo
                  }
                })*/
                this.$router.push({
                    path:'/order/alipay',
                    query:{
                        orderNo
                    }
                })
            },
            goToProduct(productId) {
                this.$router.push("/product/" + productId)
            },
            // 第一种方法：分页器
            handleCurrentChange(val) {
                this.$axios.post("/order/list.do", this.$qs.stringify({
                    userId: this.$cookie.get("userId"),
                    pageNum: val
                })).then(res=>{
                    console.log(res)
                    this.sliceElements(res.data.data)
                })
            },
            confirmShip(val) {
                this.$axios.post("/order/confirm_shipping.do", this.$qs.stringify({
                    userId: this.$cookie.get("userId"),
                    orderNo: val
                })).then(res=>{
                    if(res.data.status === 0) {
                        this.list = [];
                        this.getOrderList();
                        this.currentPage = 1;
                    } else {
                        this.$message.error("请稍后重试")
                    }
                })
            }

        }
    }
</script>
<style lang="scss">
    @import './../assets/scss/config.scss';
    @import './../assets/scss/mixin.scss';
    .order-list{
        .wrapper{
            background-color:$colorJ;
            padding-top:33px;
            padding-bottom:110px;
            .order-box{
                .order{
                    @include border();
                    background-color:$colorG;
                    margin-bottom:31px;
                    &:last-child{
                        margin-bottom:0;
                    }
                    .order-title{
                        @include height(74px);
                        background-color:$colorK;
                        padding:0 43px;
                        font-size:16px;
                        color:$colorC;
                        .item-info{
                            span{
                                margin:0 9px;
                            }
                        }
                        .money{
                            font-size:26px;
                            color:$colorB;
                        }
                    }
                    .order-content{
                        padding:0 43px;
                        .good-box{
                            width:88%;
                            .good-list{
                                display: flex;
                                align-items: center;
                                height:145px;
                                .good-img{
                                    width:112px;
                                    cursor: pointer;
                                    img{
                                        width:100%;
                                    }
                                }
                                .good-name{
                                    font-size:20px;
                                    margin-left: 10px;
                                    color:$colorB;
                                    cursor: pointer;
                                }
                            }
                        }
                        .good-state{
                            @include height(145px);
                            font-size: 20px;
                            color:$colorA;
                            a{
                                color:$colorA;
                            }
                        }
                    }
                }
                .pagination{
                    text-align:right;
                }
                .el-pagination.is-background .el-pager li:not(.disabled).active{
                    background-color: #FF6600;
                }
                .el-button--primary{
                    background-color: #FF6600;
                    border-color: #FF6600;
                }
                .load-more,.scroll-more{
                    text-align:center;
                }
            }
        }
    }
</style>
