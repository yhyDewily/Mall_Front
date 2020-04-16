<template>
    <div>
        <div class="item-intro-detail" ref="itemIntroDetail">
            <div class="item-intro-nav" >
                <el-tabs type="border-card">
                    <el-tab-pane label="商品详情">
                        <div class="item-intro-img" ref="itemIntroGoods">
                            <img :src="item" alt="" v-for="(item,index) in detail" :key="index">
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="规格参数">
                        <div class="item-param-container">
                            <span class="item-param-box"
                            v-for="(item,index) in productParams"
                            :key="index">
                                <span class="item-param-title">
                                    {{ item.title }}：
                                </span>
                                <span class="item-param-content">
                                    {{ item.content }}
                                </span>
                            </span>
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
                {
                    title: '名称',
                    content: '花花公子男士外套'
                },
                {
                    title: '基础风格',
                    content: '青春流行'
                },
                {
                    title: '厚薄',
                    content: '常规'
                },
                {
                    title: '材质成分',
                    content: '聚酯纤维100%'
                }
            ],
            detail: [
                '/imgs/detail/detail-1.jpg',
                '/imgs/detail/detail-2.jpg',
                '/imgs/detail/detail-3.jpg',
            ]
        })
    }
</script>

<style scoped>
.item-intro-detail{
    width: 65%;
    margin-left: 340px;
}
.item-param-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
}
.item-param-box {
    padding: 5px;
    width: 240px;
    height: 36px;
    font-size: 14px;
    /* text-align: center; */
    /* background-color: #ccc; */
}
.item-param-title {
    color: #232323;
}
.item-param-content {
    color: #999;
}
.item-intro-img{
    width: 100%;
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
</style>
