<template>
    <div class="ali-pay">
        <order-header title="订单支付">
            <template v-slot:tip>
                <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
            </template>
        </order-header>
        <div class="wrapper">
            <img :src="qrCode">
        </div>
    </div>
</template>

<script>
    import OrderHeader from "../components/OrderHeader";
    export default {
        name: "alipay",
        data(){
            return{
                qrCode: "/imgs/qrCode/qr-",
                T: ''
            }
        },
        components:{
            OrderHeader,
        },
        mounted() {
            this.checkPaid()
        },
        methods: {
            checkPaid(){
                this.qrCode = this.qrCode + this.$route.query.orderNo+'.png';
                this.loopOrderState()
            },
            loopOrderState(){
                this.T = setInterval(()=>{
                    this.$axios.post("/order/query_order_pay.do", this.$qs.stringify({
                        userId: this.$cookie.get('userId'),
                        orderNo: this.$route.query.orderNo
                    })).then(res=>{
                        console.log(res)
                        if(res.data.data === true) {
                            clearInterval(this.T);
                            this.goOrderList();
                        }
                    })
                }, 1000)
            },
            goOrderList() {
                this.$router.push('/order/list')
            }
        }
    }
</script>

<style scoped lang="scss">
    .ali-pay{
        .wrapper{
            background-color:#F5F5F5;
        }
    }
</style>
