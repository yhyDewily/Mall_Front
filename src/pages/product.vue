<template>
    <div>
        <div class="header-line"></div>
        <div class="item-detail-show">
<!--            图片部分-->
            <div class="item-detail-left">
                <div class="item-detail-big-img">
                    <img :src="productInfo.imgs[imgIndex]" alt="">
                </div>
                <div class="item-detail-img-row">
                    <div class="item-detail-img-small"
                         v-for="(item,index) in productInfo.imgs"
                         :key="index"
                         @mouseover="showBigImg(index)">
                        <img :src="item" alt="">
                    </div>
                </div>
            </div>
<!--            价格，标题，评价总数部分-->
            <div class="item-detail-right">
<!--                标题-->
                <div class="item-detail-title">
                    <p>{{ productInfo.title }}</p>
                </div>
                <div class="item-detail-price-row">
<!--                    价格-->
                    <div class="item-price-left">
                        <div class="item-price-row">
                            <p>
                                <span class="item-price-title">价 格</span>
                                <span class="item-price">￥{{ productInfo.price }}</span>
                            </p>
                        </div>
                    </div>
<!--                    评价总数-->
                    <div class="item-price-right">
                        <div class="item-remarks-sum">
                            <p>累计评价</p>
                            <p>
                                <span class="item-remarks-num">
                                    {{ productInfo.remarksNum }}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="item-select">
                    <div class="item-select-title">
                        <p>选择颜色</p>
                    </div>
                    <div class="item-select-column">
                        <div class="item-select-row" >
                            <el-radio-group v-model="selected.color"
                                            v-for="(item,index) in productInfo.color"
                                            :key="index">
                                <el-radio-button :label="item"></el-radio-button>
                            </el-radio-group>
                        </div>
                    </div>
                </div>
                <div class="item-select">
                    <div class="item-select-title">
                        <p>尺寸</p>
                    </div>
                    <div class="item-select-row">
                        <el-radio-group v-model="selected.size"
                                        v-for="(item,index) in productInfo.size"
                                        :key="index">
                            <el-radio-button :label="item"></el-radio-button>
                        </el-radio-group>
                    </div>
                </div>
                <div class="line"></div>
                <div class="cart-price">
                    <div class="add-buy-car-box">
                        <div class="add-buy-car">
                            <el-input-number size="small" class="input-number" @change="countPrice" v-model="selected.count"  :min="1" :max="productInfo.store" label="描述文字"></el-input-number>
                            <el-button type="danger" @click="addShoppingCart" round>加入购物车</el-button>
                        </div>
                        <div class="final-price-box">
                            <p class="final-price">总价：</p>
                            <p class="final-price-num">{{ selected.price }}元</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <product-param></product-param>
    </div>
</template>

<script>
    import ProductParam from "../components/ProductParam";
    export default {
        name: "product",
        components: {ProductParam},
        component: {
            ProductParam
        },
        data: ()=>({
            productId: 0,
            imgIndex: 0,
            checked: false,
            selected: {
                color: '',
                size: '',
                count: 0
            },
            productInfo: {
                imgs: [
                    "/imgs/detail/sample-1.jpg",
                    "/imgs/detail/sample-2.jpg",
                    "/imgs/detail/sample-3.jpg",
                    "/imgs/detail/sample-4.jpg",
                ],
                title: '花花公子男士外套春季工装机能男装上衣春秋韩版潮流牛仔夹克男',
                goodsDetail: [],
                price: 458,
                remarksNum: 600,
                size: [
                    'M','L','XL','2XL','3XL','4XL'
                ],
                color:[
                    '黑色', '红色', '蓝色', '灰色', '藏青色'
                ],
                store: 35
            },
            advice: []
        }),
        mounted() {
            this.getProduct();
            this.setPrice();
        },
        methods: {
            getProduct() {
                this.productId = this.$route.params.id
                this.$axios.post('product/get_product_info.do', {
                    params:{
                        productId: this.productId
                    }
                }).then(res=>{
                    console.log(res);
                    // if(res.data.status === 0) {
                    //
                    // }
                })
            },
            setPrice() {
                return this.selected.price = this.productInfo.price
            },
            showBigImg(index){
                this.imgIndex = index;
            },
            addShoppingCart() {
                if(this.selected.color.length === 0 || this.selected.size.length === 0) {
                    window.alert("请选择规格")
                }
            },
            countPrice(){
                this.selected.price = this.productInfo.price * this.selected.count;
                console.log(this.selected.price)
            }
        }
    }
</script>

<style scoped>
    .item-detail-show {
        width: 80%;
        margin: 15px auto;
        display: flex;
        flex-direction: row;
        background-color: #fff;
    }
    .item-detail-left {
        width: 350px;
        margin-left: 180px;
        margin-right: 30px;
    }
    .item-detail-big-img {
        width: 350px;
        height: 350px;
        box-shadow: 0px 0px 8px #ccc;
        cursor: pointer;
    }
    .item-detail-big-img img {
        width: 100%;
    }
    .item-detail-img-row {
        margin-top: 15px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .item-detail-img-small {
        width: 68px;
        height: 68px;
        box-shadow: 0px 0px 8px #ccc;
        cursor: pointer;
    }
    .item-detail-img-small img {
        width: 100%;
    }
    .item-detail-right {
        display: flex;
        flex-direction: column;
    }
    .item-detail-title p {
        color: #333333;
        font-size: 20px;
    }
    .item-detail-price-row {
        margin-top: 15px;
        padding: 5px 5px 5px 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: #f3f3f3;
    }
    .item-price-left {
        display: flex;
        flex-direction: column;
    }
    .item-price-title {
        color: #999999;
        font-size: 14px;
        margin-right: 15px;
    }
    .item-price-row {
        margin: 5px 0px;
    }
    .item-price {
        color: #e4393c;
        font-size: 23px;
        cursor: pointer;
    }
    .item-remarks-sum {
        padding-top: 8px;
        padding-left: 8px;
        border-left: 1px solid #ccc;
    }
    .item-remarks-sum p {
        color: #999999;
        font-size: 12px;
        line-height: 10px;
        text-align: center;
    }
    .item-remarks-num {
        line-height: 18px;
        color: #005eb7;
    }
    .item-select {
        display: flex;
        flex-direction: row;
        margin-top: 15px;
    }
    .item-select-title {
        color: #999999;
        font-size: 16px;
        margin-right: 15px;
    }
    .item-select-title p {
        line-height: 40px;
    }
    .line {
        height:0;
        margin-top:25px;
        margin-bottom:28px;
        border-top:2px solid #E5E5E5;
    }
    .cart-price{
        background-color: #f3f3f3;
    }
    .add-buy-car-box {
        width: 100%;
    }
    .input-number {
        margin-right: 15px;
    }
    .final-price-box {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        width: 200px;
    }
    .final-price {
        font-size: 25px;
        padding: 6px 0 6px 6px;
        color: #999999;
    }
    .final-price-num {
        font-size: 25px;
        line-height: 45px;
        color: #e4393c;
    }
    .header-line {
        height:0;
        margin-bottom:28px;
        border-top:2px solid #E5E5E5;
    }
</style>
