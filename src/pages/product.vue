<template>
    <div>
        <div class="header-line"></div>
        <div class="item-detail-show">
<!--            图片部分-->
            <div class="item-detail-left">
                <div class="item-detail-big-img">
                    <img v-lazy="productInfo.imgs[imgIndex]" alt="">
                </div>
                <div class="item-detail-img-row">
                    <div class="item-detail-img-small"
                         v-for="(item,index) in productInfo.imgs"
                         :key="index"
                         @mouseover="showBigImg(index)">
                        <img v-lazy="item" alt="">
                    </div>
                </div>
            </div>
<!--            价格，标题，评价总数部分-->
            <div class="item-detail-right">
<!--                标题-->
                <div class="item-detail-title">
                    <p>{{ productInfo.title }}</p>
                    <p class="main_sub_title" style="font-size: 12px; color: #888">{{ productInfo.subtitle }}</p>
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
                            <el-input-number size="small" class="input-number" @change="countPrice" v-model="selected.count"  :min="1" :max="productInfo.store" ></el-input-number>
                            <el-button type="danger" @click="addShoppingCart" round>加入购物车</el-button>
                        </div>
                        <div class="final-price-box">
                            <p class="final-price">总价：</p>
                            <p class="final-price-num">{{ totalPrice }}元</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="item-intro-detail" ref="itemIntroDetail">
            <div class="item-intro-nav" >
                <el-tabs type="border-card">
                    <el-tab-pane label="商品详情">
                        <div class="item-param-container">
                            <h3 class="title">{{ productInfo.title }}</h3>
                            <p class="sub-title">{{ productInfo.subtitle }}</p>
                            <el-row
                                    style="margin-top: 10px">
                                <el-col :span="12">
                                    <div class="grid-content-left">
                                        <p>{{ productInfo.detail }}</p>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content-right" v-for="(item, index) in productParams" :key="index">
                                        <ul>
                                            <li style="list-style-type: disc">
                                                {{ item }}
                                            </li>
                                        </ul>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="用户评价">
                        <div class="remarks-container">
                            <div class="remark-analyse-box">
                                <div class="remarks-bar">
                                    <span>追评(2000)</span>
                                    <span>好评(3000)</span>
                                    <span>中评(900)</span>
                                    <span>差评(1)</span>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="售后保障">
                        <show-product-warranty></show-product-warranty>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>

    </div>
</template>

<script>
    import ShowProductWarranty from "../components/ShowProductWarranty";
    export default {
        name: "product",
        components: {ShowProductWarranty},
        data: ()=>({
            productId: 0,
            imgIndex: 0,
            productParams: [
            ],
            checked: false,
            selected: {
                size: '',
                count: 1
            },
            totalPrice: 0,
            productInfo: {
                imgs: [
                ],
                title: '',
                subtitle: '',
                price: 0,
                remarksNum: 600,
                size: [
                    'M','L','XL','2XL','3XL','4XL'
                ],
                stock: 0,
                detail: ''
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
                console.log(this.$route.params.id)
                this.$axios.post('/product/get_product_info.do', this.$qs.stringify({
                    productId: this.productId
                })).then(res=>{
                    console.log(res);
                    let proInfo = res.data.data;
                    this.productInfo.title = proInfo.name;
                    this.productInfo.price = proInfo.price;
                    this.productInfo.subtitle = proInfo.subtitle;
                    this.totalPrice = proInfo.price;
                    this.productParams = proInfo.params;
                    this.productInfo.imgs.push(proInfo.mainImage);
                    this.productInfo.stock = proInfo.stock;
                    this.productInfo.detail = proInfo.detail;
                    if (proInfo.subImages !== null) {
                        let i = 0;
                        for(;i<proInfo.subImages.length;i++)
                            this.productInfo.imgs.push(proInfo.subImages[i])
                    }
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
                if(this.$cookie.get("userId") === null){
                    this.$router.push("/login")
                    return
                } else if(this.selected.size.length === 0) {
                    window.alert("请选择规格")
                } else {
                   this.$axios.post("/cart/add.do", this.$qs.stringify({
                       userId: this.$cookie.get("userId"),
                       count: this.selected.count,
                       productId: this.productId,
                       size: this.selected.size
                   })).then(res=>{
                       console.log(res)
                       if(res.data.status === 0) {
                           this.$message.success("添加成功")
                       } else {
                           this.$message.error("添加失败")
                       }
                   })
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
        width: 1226px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
        background-color: #fff;
    }
    .item-detail-left {
        width: 350px;
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
        margin-left: 30px;
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
    .item-intro-detail{
        width: 1226px;
        margin-left: auto;
        margin-right: auto;
    }
    .item-param-container {

    }
    .item-intro-img img{
        width: 100%;
    }
    .remarks-bar {
        padding-left: 15px;
        height: 36px;
        line-height: 36px;
        color: #666666;
        background-color: #F7F7F7;
    }
    .remarks-bar span {
        margin-right: 15px;
    }
    .title {
        font-size: 36px;
        color: #000000;
        letter-spacing: 0;
        text-align: center;
    }
    .sub-title {
        font-size: 24px;
        color: #888;
        text-align: center;
    }
    .grid-content-left p{
        float: left;
        padding: 0 35px 0 35px;
        font-size: 14px;
        color: #000000;
        text-align: left;
        line-height: 26px;
    }
    .grid-content-right {
        font-size: 14px;
        color: #000000;
        margin-left: 10px;
    }
    .main_sub_title{
        font-size: 10px;
        color: #888888;
    }
</style>
