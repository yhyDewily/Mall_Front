<template>
    <div class="index">
        <div class="container">
            <div class="swiper-box">
                <swiper v-bind:options="swiperOption">
                    <swiper-slide v-for="(item,index) in slideList" v-bind:key="index">
                        <a v-bind:href="'/#/result/'+item.category"><img v-bind:src="item.img"></a>
                    </swiper-slide>
                    <!-- Optional controls -->
                    <div class="swiper-pagination"  slot="pagination"></div>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                </swiper>
            </div>
        </div>
        <div class="product-box">
            <div class="container">
                <h2>女装</h2>
                <h5><a href="javascript:;" @click="goToGender('100002')">更多</a></h5>
                <div class="wrapper">
                    <div class="banner-left">
                        <a href="javascript:;"><img :src="'/imgs/index/female.jpeg'" alt=""></a>
                    </div>
                    <div class="list-box">
                        <div class="list" v-for="(arr,i) in femaleList" v-bind:key="i">
                            <div class="item" v-for="(item,j) in arr" v-bind:key="j" @click="getResult(item.category)">
                                <div class="item-img">
                                    <img v-lazy="item.mainImage" alt="">
                                </div>
                                <div class="item-info">
                                    <p class="price" >{{item.name}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="product-box">
            <div class="container">
                <h2>男装</h2>
                <h5><a href="javascript:;" @click="goToGender('100001')">更多</a></h5>
                <div class="wrapper">
                    <div class="banner-left">
                        <a href="javascript:;"><img :src="'/imgs/index/male/male.jpeg'" alt=""></a>
                    </div>
                    <div class="list-box">
                        <div class="list" v-for="(arr,i) in maleList" v-bind:key="i">
                            <div class="item" v-for="(item,j) in arr" v-bind:key="j" @click="getCategory(item.category)">
                                <div class="item-img">
                                    <img v-lazy="item.mainImage" alt="">
                                </div>
                                <div class="item-info">
                                    <p class="price" >{{item.name}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'
    export default{
        name:'index',
        components:{
            Swiper,
            SwiperSlide,
        },
        data(){
            return {
                swiperOption:{
                    autoplay:true,
                    loop:true,
                    effect:'cube',
                    cubeEffect: {
                        shadowOffset: 100,
                        shadowScale: 0.6
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable:true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }
                },
                slideList:[
                    {
                        category: 'Adidas',
                        img: '/imgs/slider/slide-1.jpg'
                    },
                    {
                        category: 'UNIQLO',
                        img: '/imgs/slider/slide-2.jpg'
                    },
                    {
                        category: 'Meters',
                        img: '/imgs/slider/slide-3.jpg'
                    }
                ],
                femaleList:[
                    [
                        {
                            category: '100006',
                            name: 'T恤',
                            mainImage: '/imgs/index/female/female_shirt.jpg'
                        }, {
                        category: '100008',
                        name: '毛衣',
                        mainImage: '/imgs/index/female/female_sweater.jpg'
                    }, {
                        category: '100010',
                        name: '牛仔裤',
                        mainImage: '/imgs/index/female/female_jeans.jpg'
                    },{
                        category: '100012',
                        name: '休闲裤',
                        mainImage: '/imgs/index/female/female_pants.jpg'
                    }
                    ],[
                        {
                            category: '100004',
                            name: '裙子',
                            mainImage: '/imgs/index/female/female_skirt.jpeg'
                        },{
                            category: '100014',
                            name: '外套',
                            mainImage: '/imgs/index/female/female_coat.jpg'
                        },{
                            category: '100016',
                            name: '运动裤',
                            mainImage: '/imgs/index/female/female_sweatpants.jpg'
                        },{
                            category: '100018',
                            name: '羽绒服',
                            mainImage: '/imgs/index/female/female_downjacket.jpg'
                        }
                    ]
                ],
                maleList:[
                    [
                        {
                            category: '100005',
                            name: 'T恤',
                            mainImage: '/imgs/index/male/male_shirt.jpg'
                        }, {
                            category: '100007',
                            name: '毛衣',
                            mainImage: '/imgs/index/male/male_sweater.jpg'
                        }, {
                           category: '100009',
                            name: '牛仔裤',
                            mainImage: '/imgs/index/male/male_jeans.jpg'
                        },{
                            category: '100011',
                            name: '休闲裤',
                            mainImage: '/imgs/index/male/male_pants.jpg'
                        }
                    ],[
                        {
                            category: '100003',
                            name: '西装',
                            mainImage: '/imgs/index/male/male_suit.jpg'
                        },{
                            category: '100013',
                            name: '外套',
                            mainImage: '/imgs/index/male/male_coat.jpg'
                        },{
                            category: '100015',
                            name: '运动裤',
                            mainImage: '/imgs/index/male/male_sweatpants.jpg'
                        },{
                            category: '100017',
                            name: '羽绒服',
                            mainImage: '/imgs/index/male/male_downjacket.jpg'
                        }
                    ]
                ],
            }
        },
        mounted(){
            this.getUserInfo();
        },
        methods:{
            getUserInfo() {
                this.$axios.post('/user/get_user_info.do').then(response=>{
                    console.log(response)
                })
            },
            getCategory(category) {
                this.$router.push({
                    name: 'result',
                    params: {
                        query: category
                    }
                })
            },
            getResult: function (val) {
                if(val !== "") {
                    this.$router.push({
                        name: 'result',
                        params: {
                            query: val
                        }
                    });
                }
            },
            goToGender: function (val) {
                this.$router.push({
                    name: 'result',
                    params: {
                        query: val
                    }
                })
            }
            // goToCart(){
            //     this.$router.push('/cart');
            // }
        }
    }
</script>
<style lang="scss">
    @import './../assets/scss/config.scss';
    @import './../assets/scss/mixin.scss';
    .index{
        .swiper-box{
            .swiper-container {
                height: 451px;
                img{
                    width:100%;
                    height:100%;
                }
            }
        }
        .product-box{
            margin-top: 50px;
            background-color:$colorJ;
            padding:30px 0 50px;
            h2{
                display: inline-block;
                font-size:$fontF;
                height:21px;
                line-height:21px;
                color:$colorB;
                margin-bottom:20px;
            }
            h5 {
                display: inline-block;
                margin-left: 155px;
                a{
                    color: #999999;
                    &:hover {
                        color: #042dab;
                    }
                }
            }
            .wrapper{
                display:flex;
                .banner-left{
                    margin-right:16px;
                    img{
                        width:224px;
                        height:619px;
                    }
                }
                .list-box{
                    .list{
                        @include flex();
                        width:986px;
                        margin-bottom:14px;
                        &:last-child{
                            margin-bottom:0;
                        }
                        .item{
                            cursor: pointer;
                            width:225px;
                            height:302px;
                            background-color:$colorG;
                            text-align:center;
                            span{
                                display:inline-block;
                                width:67px;
                                height:24px;
                                font-size:14px;
                                line-height:24px;
                                color:$colorG;
                            }
                            .item-img{
                                img{
                                    width:100%;
                                    height:270px;
                                }
                            }
                            .item-info{
                                .price{
                                    color: #333333;
                                    font-size:20px;
                                    font-weight:bold;
                                    cursor:pointer;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
