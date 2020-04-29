<template>
    <div class="order-confirm">
        <order-header title="订单确认">
            <template v-slot:tip>
                <span>请认真填写收货地址</span>
            </template>
        </order-header>
        <div class="wrapper">
            <div class="container">
                <div class="order-box">
                    <div class="item-address">
                        <h2 class="addr-title">收货地址</h2>
                        <div class="addr-list clearfix">
                            <div class="addr-info" :class="{'checked':index === checkIndex}" @click="checkIndex=index" v-for="(item,index) in list" :key="index">
                                <h2>{{item.recipient}}</h2>
                                <div class="phone">{{item.mobile}}</div>
                                <div class="street">{{item.address}}</div>
                                <div class="action">
                                    <a href="javascript:;" class="fl" @click="delAddress(item)">
                                        <i class="el-icon-delete"></i>
                                    </a>
                                    <a href="javascript:;" class="fr" @click="editAddressModal(item)">
                                        <i class="el-icon-edit"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="addr-add" @click="openAddressModal">
                                <div class="icon-add"></div>
                                <div>添加新地址</div>
                            </div>
                        </div>
                    </div>
                    <div class="item-good">
                        <h2>商品</h2>
                        <ul>
                            <li v-for="(item,index) in cartList" :key="index">
                                <div class="good-name">
                                    <img v-lazy="item.productMainImage" alt="">
                                    <span style="margin-left: 10px">{{item.productName + ' ' + item.productSubtitle}}</span>
                                </div>
                                <div class="good-price">{{item.productPrice}}元x{{item.quantity}}</div>
                                <div class="good-total">{{item.productTotalPrice}}元</div>
                            </li>
                        </ul>
                    </div>
                    <div class="item-shipping">
                        <h2>配送方式</h2>
                        <span>包邮</span>
                    </div>
                    <div class="item-invoice">
                        <h2>发票</h2>
                        <a href="javascript:;">电子发票</a>
                        <a href="javascript:;">个人</a>
                    </div>
                    <div class="detail">
                        <div class="item">
                            <span class="item-name">商品件数：</span>
                            <span class="item-val">{{count}}件</span>
                        </div>
                        <div class="item">
                            <span class="item-name">商品总价：</span>
                            <span class="item-val">{{cartTotalPrice}}元</span>
                        </div>
                        <div class="item-total">
                            <span class="item-name">应付总额：</span>
                            <span class="item-val">{{cartTotalPrice}}元</span>
                        </div>
                    </div>
                    <div class="btn-group">
                        <a href="/#/cart" class="btn btn-default btn-large" style="margin-right: 10px">
                            <el-button type="info">返回购物车</el-button>
                        </a>
                        <a href="javascript:;" class="btn btn-large"  style="margin-right: 10px" @click="orderSubmit">
                            <el-button type="warning">去结算</el-button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <Modal
                title="地址编辑"
                btnType="1"
                :showModal="showEditModal"
                @cancel="showEditModal=false"
                @submit="submitAddress"
        >
            <template v-slot:body>
                <div class="edit-wrap">
                    <div class="item">
                        <input type="text" class="input" placeholder="姓名" v-model="checkedItem.recipient">
                        <input type="text" class="input" placeholder="手机号" v-model="checkedItem.mobile">
                    </div>
                    <div class="item">
                        <input type="text" class="input" placeholder="地址,格式为省/市+市/县/区+具体住址" v-model="checkedItem.address">
                    </div>
                    <div class="item">
                        <input type="text" class="input" placeholder="邮编" v-model="checkedItem.postcode">
                    </div>
                </div>
            </template>
        </Modal>
        <Modal
                title="删除确认"
                btnType="1"
                :showModal="showDelModal"
                @cancel="showDelModal=false"
                @submit="submitAddress"
        >
            <template v-slot:body>
                <p>您确认要删除此地址吗？</p>
            </template>
        </Modal>
    </div>
</template>

<script>
    import OrderHeader from "../components/OrderHeader";
    import Modal from "../components/modal";
    export default {
        name: "orderConfirm",
        components: {OrderHeader, Modal},
        data: ()=>({
            list: [],
            cartList: [],
            cartTotalPrice: 0,
            count: 0,
            checkedItem: {
                id: 0,
                userId: 0,
                recipient: "",
                address: "",
                postcode: "",
                mobile: ""
            },
            userAction: '',
            showDelModal: false,
            showEditModal: false,
            checkIndex: 0
        }),
        mounted() {
            this.getAddressList();
            this.getUserCart();
        },
        methods: {
            getAddressList(){
                this.$axios.post('/address/getAddressList.do', this.$qs.stringify({
                    userId: this.$cookie.get("userId")
                })).then((res)=>{
                    console.log(res);
                    this.list = res.data.data;
                })
            },
            getUserCart() {
                this.$axios.post('/cart/list.do',this.$qs.stringify({
                    userId: this.$cookie.get("userId")
                })).then((res)=>{
                    console.log(res);
                    let cart_list = res.data.data.cartProductVoList;
                    this.cartTotalPrice = res.data.data.cartTotalPrice;
                    this.cartList = cart_list.filter(item=>item.productChecked);
                    this.cartList.map((item)=>{
                        this.count += item.quantity;
                    })

                })
            },
            delAddress(item) {
                this.checkedItem = item;
                this.userAction = 2;
                this.showDelModal = true;
            },
            editAddressModal(item) {
                this.userAction = 1;
                this.checkedItem = item;
                this.showEditModal = true;
            },
            openAddressModal(){
                this.userAction = 0;
                this.checkedItem = {};
                this.showEditModal = true;
            },
            orderSubmit(){
                let item = this.list[this.checkIndex];
                if(!item){
                    this.$message.error('请选择一个收货地址');
                    return;
                }
                this.$axios.post("/order/create.do", this.$qs.stringify({
                    userId: this.$cookie.get("userId"),
                    addressId: item.id
                })).then(res=>{
                    console.log(res)
                    if(res.data.status === 0) {
                        this.$router.push({
                            name: 'order-pay',
                            query: {
                                orderNo: res.data.data.orderNo
                            }
                        })
                    }
                })
                // this.$axios.post('/order/submit.do', this.$qs.stringify({
                //     addressId: item.id
                // }))
            },
            checkLegal(){
                let checkedItem = this.checkedItem;
                let { recipient, mobile, address, postcode} = checkedItem;
                let errMsg = '';
                if(!recipient){
                    errMsg = '请输入收货人名称';
                } else if(!mobile || !/^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/.test(mobile)){
                    errMsg = '请输入正确格式的手机号';
                } else if(!address){
                    errMsg = '请输入收货地址';
                } else if(!/\d{6}/.test(postcode)){
                    errMsg = '请输入六位邮编';
                }
                if(errMsg){
                    this.$message.error(errMsg);
                    return false;
                } else {
                    return true;
                }
            },
            submitAddress(){
                let userAction= this.userAction;
                let { id, recipient, mobile, address, postcode} = this.checkedItem;
                if(userAction === 0) {
                    if(this.checkLegal()){
                        this.$axios.post("/address/add.do", this.$qs.stringify({
                            userId: this.$cookie.get("userId"),
                            recipient: recipient,
                            mobile: mobile,
                            address: address,
                            postcode: postcode,
                        })).then(res=>{
                            console.log(res)
                            if(res.status === 200){
                                this.closeModal();
                                this.getAddressList();
                                this.$message.success("操作成功");
                            }
                        }).catch(err=>{
                            console.log(err)
                        })
                    } else {
                        return;
                    }
                }
                if(userAction === 1) {
                    if(this.checkLegal()){
                        this.$axios.post("/address/modify.do", this.$qs.stringify({
                            id: id,
                            userId: this.$cookie.get("userId"),
                            recipient: recipient,
                            mobile: mobile,
                            address: address,
                            postcode: postcode,
                        })).then(res=>{
                            console.log(res)
                            if(res.status === 200){
                                this.closeModal();
                                this.getAddressList();
                                this.$message.success("操作成功");
                            }
                        }).catch(err=>{
                            console.log(err)
                        })
                    } else {
                        return;
                    }
                }
                if(userAction === 2) {
                    this.$axios.post("/address/delete.do", this.$qs.stringify({
                        id:this.checkedItem.id
                    })).then(res=>{
                        console.log(res)
                        this.closeModal();
                        this.getAddressList();
                    })
                }
            },
            closeModal(){
                this.checkedItem = {};
                this.userAction = '';
                this.showDelModal = false;
                this.showEditModal = false;
            },
        }
    }
</script>

<style lang="scss">
    .order-confirm{
        .wrapper{
            background-color:#F5F5F5;
            padding-top:30px;
            padding-bottom:84px;
            .order-box{
                background-color:#ffffff;
                padding-left: 40px;
                padding-bottom: 40px;
                .addr-title{
                    font-size: 20px;
                    color: #333333;
                    font-weight: 200;
                    margin-bottom:21px;
                }
                .item-address{
                    padding-top: 38px;
                    .addr-list{
                        .addr-info,.addr-add{
                            box-sizing:border-box;
                            float: left;
                            width:271px;
                            height:180px;
                            border:1px solid #E5E5E5;
                            margin-right: 15px;
                            padding: 15px 24px;
                            font-size: 14px;
                            color:#757575;
                        }
                        .addr-info{
                            cursor:pointer;
                            h2{
                                height:27px;
                                font-size:18px;
                                font-weight: 300;
                                color:#333;
                                margin-bottom:10px;
                            }
                            .street{
                                height:50px;
                            }
                            .action{
                                height:50px;
                                line-height:50px;
                                .icon{
                                    width: 20px;
                                    height: 20px;
                                    fill: #666666;
                                    vertical-align: middle;
                                    &:hover{
                                        fill: #FF6700;
                                    }
                                }
                            }
                            &.checked{
                                border:1px solid #ff6700;
                            }
                        }
                        .addr-add{
                            text-align:center;
                            color: #999999;
                            cursor:pointer;
                            .icon-add{
                                width:30px;
                                height:30px;
                                border-radius:50%;
                                background:url('/imgs/icon-add.png') #E0E0E0 no-repeat center;
                                background-size:14px;
                                margin: 0 auto;
                                margin-top: 45px;
                                margin-bottom: 10px;
                            }
                        }
                    }
                }
                .item-good{
                    margin-top:34px;
                    border-bottom: 1px solid #E5E5E5;
                    padding-bottom: 12px;
                    h2{
                        border-bottom:1px solid #E5E5E5;
                        padding-bottom: 5px;
                    }
                    li{
                        display:flex;
                        align-items: center;
                        height:40px;
                        line-height:40px;
                        margin-top:10px;
                        font-size:16px;
                        color:#333333;
                        .good-name{
                            flex:5;
                            img{
                                width:30px;
                                height:30px;
                                vertical-align:middle;
                            }
                        }
                        .good-price{
                            flex:2;
                        }
                        .good-total{
                            padding-right:44px;
                            color:#FF6600;
                        }
                    }
                }
                .item-shipping,.item-invoice{
                    margin-top:31px;
                    line-height: 20px;
                    h2{
                        display: inline-block;
                        margin-right: 71px;
                        font-size: 20px;
                        width: 80px;
                    }
                    span,a{
                        font-size:16px;
                        color:#FF6700;
                        margin-right:23px;
                    }
                }
                .detail{
                    padding: 50px 44px 33px 0;
                    border-bottom: 1px solid #f5f5f5;
                    text-align: right;
                    font-size: 16px;
                    color: #666666;
                    .item-val{
                        color:#FF6700;
                    }
                    .item{
                        line-height: 15px;
                        margin-bottom: 12px;
                    }
                    .item-val{
                        display:inline-block;
                        width:100px;
                    }
                    .item-total{
                        .item-val{
                            font-size:28px;
                        }
                    }
                }
                .btn-group{
                    margin-top: 37px;
                    text-align: right;
                }
            }
        }
        .edit-wrap{
            font-size:14px;
            .item{
                margin-bottom:15px;
                .input{
                    display:inline-block;
                    width:283px;
                    height:40px;
                    line-height:40px;
                    padding-left:15px;
                    border:1px solid #E5E5E5;
                    &+.input{
                        margin-left:14px;
                    }
                }
                select{
                    height:40px;
                    line-height:40px;
                    border:1px solid #E5E5E5;
                    margin-right:15px;
                }
                textarea{
                    height:62px;
                    width:100%;
                    padding:13px 15px;
                    box-sizing:border-box;
                    border:1px solid #E5E5E5;
                }
            }
        }
    }
</style>
