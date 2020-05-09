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
                    <el-menu-item @click="handleGrand(item.index)">{{ item.name }}</el-menu-item>
                </div>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">男装</template>
                <div class="grand" v-for="(item,index) in maleCategory" :key="index">
                    <el-menu-item @click="handleType(item.id)">{{ item.name }}</el-menu-item>
                </div>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">女装</template>
                <div class="grand" v-for="(item,index) in femaleCategory" :key="index">
                    <el-menu-item @click="handleType(item.id)">{{ item.name }}</el-menu-item>
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
                    index: 'adidas',
                    name: '阿迪达斯(Adidas)'
                },
                {
                    index: 'nike',
                    name: '耐克(Nike)'
                },
                {
                    index: 'uniqlo',
                    name: '优衣库(UNIQLO)'
                },
                {
                    index: 'meters',
                    name: '美特斯邦威(MetersBone)'
                },
                {
                    index: 'zara',
                    name: 'Zara'
                },
            ],
            maleCategory: [
                {
                    name: '西装',
                    id: 100003
                },
                {
                    name: 'T恤',
                    id: 100005
                },
                {
                    name: '运动裤',
                    id: 100015
                },
                {
                    name: '毛衣',
                    id: 100007
                },
                {
                    name: '牛仔裤',
                    id: 100009
                },
                {
                    name: '休闲裤',
                    id: 100011
                },
                {
                    name: '外套',
                    id: 100013
                },
                {
                    name: '羽绒服',
                    id: 100017
                }
            ],
            femaleCategory: [
                {
                    name: '裙子',
                    id: 100004
                },
                {
                    name: 'T恤',
                    id: 100006
                },
                {
                    name: '运动裤',
                    id: 100016
                },
                {
                    name: '毛衣',
                    id: 100008
                },
                {
                    name: '牛仔裤',
                    id: 100010
                },
                {
                    name: '休闲裤',
                    id: 100012
                },
                {
                    name: '外套',
                    id: 100014
                },
                {
                    name: '羽绒服',
                    id: 100018
                }
            ],
            activeIndex: '1',
            activeIndex2: '1'
        }),
        methods: {
            handleGrand(grandId) {
                this.$emit("getGrandResult", grandId);
                console.log(grandId);
            },
            handleType(categoryId) {
                this.$emit("getTypeResult", categoryId);
                console.log(categoryId);
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
