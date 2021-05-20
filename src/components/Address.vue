<template>
    <div class="user_address">
        <div class="wrapper">
            <div class="container">
                <div class="order-box">
                    <div class="item-address">
                        <h2 class="addr-title">收货地址</h2>
                        <div class="addr-list clearfix">
                            <div class="addr-info" v-for="(item,index) in list" :key="index">
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
    import Modal from "./Modal";
    export default {
        name: "Address",
        components: {
            Modal: Modal
        },
        data: ()=>({
            list:[],
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
        },
        methods:{
            getAddressList(){
                this.$axios.post('/address/getAddressList.do', this.$qs.stringify({
                    userId: this.$cookie.get("userId")
                })).then((res)=>{
                    console.log(res);
                    this.list = res.data.data;
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
            }
        }
    }
</script>

<style lang="scss">
    .user_address{
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
