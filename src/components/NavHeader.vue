<template>
    <div class="header">
        <div class="nav-topbar">
            <div class="container">
                <div class="topbar-user">
                    <a href="/#/index">主页</a>
                    <a href="javascript:;" v-if="username" @click="goToPerson">{{ username }}</a>
                    <a href="javascript:;" v-if="!username" @click="login">登录</a>
                    <a href="javascript:;" v-if="!username" @click="register">注册</a>
                    <a href="javascript:;" v-if="username" @click="logout">退出</a>
                    <a href="/#/order/list" v-if="username" >我的订单</a>
                    <a href="javascript:;" class="my-cart" @click="goToCart"><span class="icon-cart"></span>购物车</a>
                </div>
            </div>
        </div>
        <div class="nav-header">
            <div class="container">
                <div class="header-logo">
                    <a href="/#/index"></a>
                </div>
                <div class="header-menu">
                    <div class="item-menu">
                        <span>猜你喜欢</span>
                        <div class="children">
                            <ul>
                                <li class="product" v-for="(item, index) in recommendList" :key="index" @click="addHits(item.id)">
                                    <a :href="'/#/product/' + item.id" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="item.mainImage" :alt="item.subtitle">
                                        </div>
                                        <div class="pro-name">{{ item.name }}</div>
                                        <div class="pro-price">{{ item.price }}￥</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="item-menu">
                        <span>时下流行</span>
                        <div class="children">
                            <ul>
                                <li class="product" v-for="(item, index) in productList" :key="index" @click="addHits(item.id)">
                                    <a :href="'/#/product/' + item.id" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="item.mainImage" :alt="item.subtitle">
                                        </div>
                                        <div class="pro-name">{{ item.name }}</div>
                                        <div class="pro-price">{{ item.price }}￥</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="header-search">
                    <div class="wrapper">
                        <input type="text" name="keyword" v-model="searchParams">
                        <a @click="searching"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "NavHeader",
        props: ["productList", "recommendList"],
        data: ()=> ({
            // username: '',
            searchParams: '',
        }),
        computed: {
            ...mapState(['username', 'cartCount'])
        },
        methods: {
            login: function () {
                this.$router.push("/login");
            },
            logout: function () {
                this.$cookie.set('userId','',{expires:'-1'})
                localStorage.clear()
                this.$store.dispatch('saveUserName','');
                this.$store.dispatch('saveCartCount','0');
                this.$axios.post('/user/logout.do')
                    .then((res)=>{
                        console.log(res)
                    })
                this.$message.success("退出成功")
            },
            goToCart: function () {
                if(this.username !== "") this.$router.push("/cart");
                else this.$router.push("/login");
            },
            register: function () {
                this.$router.push("/register");
            },
            searching: function () {
                if(this.$route.name === "result"){
                    this.$emit("getSearchResult", this.searchParams)
                } else if(this.searchParams !== "") {
                    let query = this.searchParams;
                    this.$router.push({
                        name: 'result',
                        params: {
                            query: query
                        }
                    });
                }
            },
            goToPerson: function () {
                this.$router.push('/person');
            },
            addHits: function (val) {
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
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "./../assets/scss/base.scss";
    @import "./../assets/scss/mixin.scss";
    @import "./../assets/scss/config.scss";
    .header {
        .nav-topbar{
            height: 39px;
            line-height: 39px;
            background-color: #333333;
            color: #B0B0B0;
            .container{
                @include flex();
                a{
                    display: inline-block;
                    color: #B0B0B0;
                    margin-right: 17px;
                }
                .my-cart {
                    width: 110px;
                    background-color: #042dab;
                    text-align: center;
                    color: #ffffff;
                    margin-right: 0;
                    .icon-cart {
                        @include bgImg(16px, 12px,"/imgs/icon-cart.png");
                        margin-right: 6px;
                    }
                }
            }
        }
        .nav-header{
            .container{
                position: relative;
                height: 112px;
                @include flex();
                .header-menu {
                    display: inline-block;
                    width: 643px;
                    padding-left: 209px;
                    .item-menu{
                        display: inline-block;
                        color: #333333;
                        font-weight: bold;
                        font-size: 16px;
                        line-height: 112px;
                        margin-right: 20px;
                        span {
                            cursor: pointer;
                        }
                        &:hover{
                            color: #042dab;
                            .children{
                                height: 220px;
                                opacity: 1;
                                border-top: 1px solid #e5e5e5;
                            }
                        }
                        .children {
                            position: absolute;
                            top: 112px;
                            left: 0;
                            width: 1226px;
                            height: 0;
                            opacity: 0;
                            overflow: hidden;
                            box-shadow: 0px 7px 6px 0px(0,0,0,0.11);
                            z-index: 10;
                            transition: all .5s;
                            background-color: #ffffff;
                            .product{
                                position: relative;
                                float: left;
                                width: 16.6%;
                                height: 220px;
                                font-size: 12px;
                                line-height: 12px;
                                text-align: center;
                                a{
                                    display: inline-block;
                                }
                                img{
                                    width: auto;
                                    height: 111px;
                                    margin-top: 26px;
                                }
                                .pro-img{
                                    height: 137px;
                                }
                                .pro-name{
                                    font-weight:bold;
                                    margin-top:19px;
                                    margin-bottom:8px;
                                    color:$colorB;
                                }
                                .pro-price{
                                    color:$colorA;
                                }
                                &:before{
                                    content:' ';
                                    position:absolute;
                                    top:28px;
                                    right:0;
                                    border-left:1px solid $colorF;
                                    height:100px;
                                    width:1px;
                                }
                                &:last-child:before{
                                    display:none;
                                }
                            }
                        }
                    }
                }
                .header-search {
                    width: 319px;
                    .wrapper{
                        height: 50px;
                        border: 1px solid #E0E0E0;
                        display: flex;
                        align-items: center;
                        input{
                            border: none;
                            box-sizing: border-box;
                            border-right: 1px solid #E0E0E0;
                            width: 264px;
                            height: 50px;
                            padding-left: 14px;
                        }
                        a {
                            @include bgImg(18px, 18px, '/imgs/icon-search.png');
                            margin-left: 17px;
                        }
                    }
                }
            }
        }
    }
</style>
