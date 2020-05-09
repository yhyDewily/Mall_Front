<template>
    <div>
        <div class="item-intro-detail" ref="itemIntroDetail">
            <div class="item-intro-nav" >
                <el-tabs type="border-card">
                    <el-tab-pane label="商品详情">
                        <div class="item-param-container">
                            <h3 class="title">ADIDAS NEO M ESNTL LG T 1 运动短袖T恤</h3>
                            <p class="sub-title">一款采用修身型剪裁的日常T恤</p>
                            <el-row
                            style="margin-top: 10px">
                                <el-col :span="12">
                                    <div class="grid-content-left">
                                        <p>有时候越简单越好。展现你的态度。这款Essentials T恤，在胸前饰撞色adidas徽标，旨在展现品牌风范。</p>
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
    import ShowProductWarranty from "./ShowProductWarranty";
    export default {
        name: "ProductParam",
        components: {
            ShowProductWarranty
        },
        data: ()=>({
            productParams: [
                "修身型剪裁",
                "圆领",
                "棉",
                "徽标T恤",
                "短袖"
            ],
        })
    }
</script>

<style scoped>
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
    }
</style>
