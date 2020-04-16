<template>
    <div>
        <div class="nav-topbar">
            <div class="container">
                <div class="topbar-user">
                    <a href="/#/index">主页</a>
                    <a href="javascript:;" v-if="username" @click="goToPerson">{{ username }}</a>
                    <a href="javascript:;" v-if="username" @click="logout">退出</a>
                    <a href="/#/order/list" v-if="username" >我的订单</a>
                    <a href="javascript:;" class="my-cart" @click="goToCart"><span class="icon-cart"></span>购物车</a>
                </div>
            </div>
        </div>
        <el-container class="person-container">
            <el-aside
            style="background-color: #e5e5e5">
                <el-avatar :size="110"
                           :src="circleUrl"
                           style="margin-left: 95px;
                                  margin-top: 20px"
                ></el-avatar>
                <p class="username">Dewily</p>
                <div class="function">
                    <a href="/#/person/address">收货地址</a>
                    <a href="/#/person/person_info">修改个人信息</a>
                    <a href="/#/cart">我的购物车</a>
                    <a href="/#/order">我的订单</a>
                </div>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import NavFooter from "../components/NavFooter";
    import {mapState} from 'vuex'
    export default {
        name: "person",
        components: {NavFooter},
        computed: {
            ...mapState(['username', 'cartCount'])
        },
        data: () => ({
            circleUrl: "/imgs/avatar.png"
        }),
        methods: {
            logout: function () {

            },
            goToCart: function () {
                if(this.username !== "") this.$router.push("/cart");
                else this.$router.push("/login");
            },
            goToPerson: function () {
                this.$router.push('/person');
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "./../assets/scss/base.scss";
    @import "./../assets/scss/mixin.scss";
    @import "./../assets/scss/config.scss";
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
                } }
    }
    .username {
        font-size: 20px;
        margin-top: 10px;
        text-align: center;
    }
    .function {
        margin-top: 12px;
        text-align: center;
        font-size: 16px;
        a {
            color: #333333;
            display: flex;
            flex-direction: column;
            margin-bottom: 5px;
            cursor: pointer;
            &:hover {
                color: #FF6600;
            }
        }
    }
</style>
