<template>
    <div class="item-class-show" style="background-color: #f3f3f3">
        <el-menu :default-active="activeIndex" class="el-menu-demo"
                 mode="horizontal"
                 text-color="#666"
                 background-color=" #f3f3f3"
                 active-text-color="#ffd04b">
            <el-submenu index="1">
                <template slot="title">品牌</template>
                <div class="grand" v-for="(item,index) in grand" :key="index">
                    <el-menu-item @click="handleSelect(item.index)">{{ item.name }}</el-menu-item>
                </div>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">种类</template>
                <div class="grand" v-for="(item,index) in category" :key="index">
                    <el-menu-item @click="handleSelect(item)">{{ item }}</el-menu-item>
                </div>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "GoodsClassNav",
        data: ()=> ({
            // username: '',

            grand: [
                {
                    index: 'Adidas',
                    name: '阿迪达斯(Adidas)'
                },
                {
                    index: 'Nike',
                    name: '耐克(Nike)'
                },
                {
                    index: '恒源祥',
                    name: '恒源祥'
                },
                {
                    index: 'playboy',
                    name: '花花公子(Playboy)'
                },
                {
                    index: 'UNIQLO',
                    name: '优衣库(UNIQLO)'
                },
                {
                    index: 'Meters',
                    name: '美特斯邦威(MetersBone)'
                },
                {
                    index: 'Zara',
                    name: 'Zara'
                },
            ],
            category: [
                '西装',
                '裙子',
                'T恤',
                '毛衣',
                '牛仔裤',
                '休闲裤',
                '外套',
                '运动裤',
                '羽绒服'
            ],
            activeIndex: '1',
            activeIndex2: '1'
        }),
        methods: {
            handleSelect(key) {
                console.log(key);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "./../assets/scss/base.scss";
    @import "./../assets/scss/mixin.scss";
    @import "./../assets/scss/config.scss";
    .el-menu {
        position: relative;
        width: 1226px;
        margin-left: auto;
        margin-right: auto;
    }
</style>
