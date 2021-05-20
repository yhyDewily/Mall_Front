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
                            <p class="final-price-num">{{ selected.price }}元</p>
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
                            <div class="remarks-bar">
                                <el-button type="text" @click="addRemark">添加评价</el-button>
                            </div>
                            <div class="add-remark" v-show="remark">
                                <el-form :model="newRemark" :rules="remarkRules" ref="newRemark">
                                    <el-form-item >
                                        <el-input type="textarea" v-model="newRemark.content"></el-input>
                                    </el-form-item>
                                </el-form>
                                <div class="remark-rate">
                                    <span>请选择满意度</span>
                                    <el-rate
                                    v-model="newRemark.rate"
                                    show-text
                                    >
                                    </el-rate>
                                </div>
                                <div class="remark-button">
                                    <el-button @click="submitRemark" size="mini">提交</el-button>
                                    <el-button @click="remark=false" size="mini">取消</el-button>
                                </div>
                            </div>
                            <div class="remarks-box" v-for="(item, index) in goodsRemarks" :key="index">
                                <div class="remarks-user">
                                    <el-avatar icon="el-icon-user-solid"
                                               style="display: inline-block; text-align: center; position: relative; overflow: hidden; vertical-align: center;width: 32px;height:32px;line-height: 32px">
                                    </el-avatar>
                                    <span class="remarks-user-name">{{ item.userName }}</span>
                                </div>
                                <div class="remarks-content-box">
                                    <p>
                                        <el-rate
                                        v-model="item.rate"
                                        disabled
                                        text-color="#ff9900"
                                        >
                                        </el-rate>
                                    </p>
                                    <p class="remarks-content">{{ item.content }}</p>
                                    <p class="remarks-sub">
                                        <span class="remarks-item">{{ item.create_time }}</span>
                                    </p>
                                </div>
                            </div>
                            <div class="remark-page" v-show="totalElements > 1">
                                <el-pagination
                                        @current-change="handleCurrentChange"
                                        :current-page.sync="currentPage"
                                        :page-size="12"
                                        layout="prev, pager, next, jumper"
                                        :total="totalElements">
                                </el-pagination>
                            </div>
                            <div class="no-remark" v-show="totalElements === 0">
                                <p style="text-align: center; margin-top: 10px; font-size: 20px">暂无评价</p>
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
            currentPage: 1,
            page_size: 0,
            totalPages: 0,
            totalElements: 0,
            imgIndex: 0,
            remark:false,
            productParams: [
            ],
            newRemark:{
                rate: 0,
                content: ''
            },
            checked: false,
            selected: {
                size: '',
                count: 1,
                price: 0
            },
            totalPrice: 0,
            productInfo: {
                imgs: [
                ],
                title: '',
                subtitle: '',
                price: 0,
                remarksNum: 0,
                size: [
                    'M','L','XL','2XL','3XL','4XL'
                ],
                stock: 0,
                detail: ''
            },
            goodsRemarks: [
                {
                    userName: 'Dewily',
                    content: '商品不错',
                    rate: 5,
                    createTime: "2020-5-28"
                }
            ],
            advice: [],
            remarkRules: {
                newContent: [
                    {required: true, message: '请输入评论', trigger: 'blur'}
                ]
            }
        }),
        mounted() {
            this.getProduct();
            this.getRemark();
        },
        methods: {
            sliceElements(val) {
                this.goodsRemarks = val.content;
                this.totalElements = val.totalElements;
                this.totalPages = val.totalPages;
                this.productInfo.remarksNum = val.totalElements
            },
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
                    this.selected.price = proInfo.price;
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
            },
            handleCurrentChange(val) {
                this.$axios.post("/product/get_remark.do",this.$qs.stringify({
                    productId: this.productId,
                    pageNum: val
                })).then(res=>{
                    console.log(res)
                    this.sliceElements(res.data.data)
                })
            },
            getRemark() {
                this.$axios.post("/product/get_remark.do",this.$qs.stringify({
                    productId: this.productId
                })).then(res=>{
                    console.log(res)
                    this.sliceElements(res.data.data)
                })
            },
            addRemark() {
                if(this.$cookie.get("userId") === " ") {
                    this.$message.error("登录后才可以评论")
                    return
                }
                this.$axios.post("/product/check_purchase.do", this.$qs.stringify({
                    userId: this.$cookie.get("userId"),
                    productId: this.productId
                })).then(res=>{
                    if(res.data.status === 1) {
                        this.$message.error("只有购买过商品才能评论")
                    } else {
                        this.remark = true
                    }
                })

            },
            submitRemark() {
                if(this.newRemark.content === "") {
                    this.$message.error("评论内容不能为空")
                } else if(this.newRemark.rate === 0) {
                    this.$message.error("请选择满意度")
                } else {
                    this.$axios.post("/product/add_remark.do", this.$qs.stringify({
                        userId:this.$cookie.get("userId"),
                        productId: this.productId,
                        remark: this.newRemark.content,
                        rate: this.newRemark.rate
                    })).then(res=>{
                        console.log(res)
                        if(res.data.status === 0) {
                            this.$message.success("提交成功")
                            this.remark = false
                            this.getRemark();
                        } else {
                            this.$message.error("提交失败")
                        }
                    })

                }
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
    .remarks-box {
        padding: 15px;
        display: flex;
        flex-direction: row;
        border-bottom: 1px #ccc dotted;
    }
    .remarks-user {
        margin: 0 auto;
        width: 180px;
    }
    .remarks-user-name {

        padding-left: 15px;
    }
    .remarks-content-box {
        width: calc(100% - 180px);
    }
    .remarks-content {
        font-size: 14px;
        color: #232323;
        line-height: 28px;
    }
    .remarks-sub {
        margin-top: 15px;
        color: #ccc;
    }
    .remark-button {
        margin-top: 10px;
    }
    .add-remark {
        margin-top: 10px;
    }
</style>
