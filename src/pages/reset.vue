<template>
    <div>
        <div class="nav-topbar">
            <div class="container">
                <div class="topbar-user">
                    <a href="/#/index">主页</a>
                    <a href="javascript:;" v-if="username" @click="goToPerson">{{ username }}</a>
                    <a href="javascript:;" v-if="!username" @click="login">登录</a>
                    <a href="javascript:;" v-if="!username" @click="register">注册</a>
                    <a href="javascript:;" v-if="username" @click="logout">退出</a>
                    <a href="/#/order/list" v-if="username" >我的订单</a>
                    <a href="javascript:;" class="my-cart" @click="goToCart"><span class="icon-cart"></span>购物车</a>
                </div>
            </div>
        </div>
        <div class="auth" style="height: 800px">
            <div class="check-form">
                <el-steps :active="active">
                    <el-step title="确定用户" icon="el-icon-user-solid"></el-step>
                    <el-step title="密保问题验证" icon="el-icon-setting"></el-step>
                    <el-step title="修改密码" icon="el-icon-edit"></el-step>
                    <el-step title="密码修改成功" icon="el-icon-check"></el-step>
                </el-steps>
                <div class="check-user" v-show="active === 1">
                    <p>请输入之前绑定的手机号</p>
                    <div class="auth-phone"
                         v-show="active === 1">
                        <el-form ref="form_1" :model="form_1" :rules="rules">
                            <el-form-item label="手机号" prop="phone">
                                <el-input v-model="form_1.phone" placeholder="请输入手机号"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div class="check-method" v-show="active === 2">
                    <el-form>
                        <el-form-item label="密保问题">
                            <el-input :disabled="true" v-model="authQuestion.question"></el-input>
                        </el-form-item>
                        <el-form-item label="密保答案">
                            <el-input placeholder="请输入密保答案" v-model="authQuestion.answer"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="update-password" v-show="active === 3">
                    <el-form :model="pwdForm" :rules="pwdRules" ref="pwdForm">
                        <el-form-item label="新密码" prop="pass">
                            <el-input type="password" v-model="pwdForm.pass" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input type="password" v-model="pwdForm.checkPass" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="update-success" v-show="active === 4">
                    <div class="register-success"
                         style="font-size: 25px; text-align: center; margin-top: 20px"
                    >注册成功，将在{{ count }}秒后跳转到登录页面，或点击下面按钮直接跳转</div>
                    <el-button @click="jump"
                               type="success" round
                               style="margin-left: 130px; margin-top: 20px"
                    >确定</el-button>
                </div>
                <el-row style="text-align: center">
                    <el-button
                            @click="nextStep"
                            v-show="active !==4"
                    >下一步</el-button>
                </el-row>

            </div>
        </div>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import NavFooter from "../components/NavFooter";
    import {mapState} from 'vuex'
    export default {
        name: "reset",
        components: {NavFooter},
        computed: {
            ...mapState(['username', 'cartCount'])
        },
        data() {
            const validatePass = (rule, value, callback) => {
                if(value.toString().length<6) callback(new Error('密码长度不得小于6'))
                if(value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if(this.pwdForm.checkPass !== '') {
                        this.$refs.pwdForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            const validatePass2 = (rule, value, callback) => {
                if(value === ''){
                    callback(new Error('请再次输入密码'));
                } else if(value !== this.pwdForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else{
                    callback();
                }
            }
            return {
                active: 1,
                count: '',
                userId: 0,
                authQuestion: {
                    question: '',
                    answer: ''
                },
                pwdForm: {
                    pass: '',
                    checkPass: ''
                },
                form_1: {
                    phone: ''
                },
                pwdRules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                },
                rules: {
                    phone: [
                        // { required: true, message: '请输入手机号', trigger: 'blur'},
                        // { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur'},
                        {
                            required: true,
                            pattern: /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/,
                            message: '请输入正确的手机号',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        mounted() {
            window.onbeforeunload = function () {
                var storage = window.localStorage;
                this.$cookie.remove("userId")
                storage.clear()
                localStorage.clear()
            }
        },
        methods: {
            getQuestion() {
                this.$axios.post("/user/forget_get_question.do", this.$qs.stringify({
                    userId: this.userId
                })).then(res=>{
                    this.authQuestion.question = res.data.data
                })
            },
            nextStep() {
                if(this.active === 1) {
                    this.$refs['form_1'].validate((valid) => {
                        if(valid) {
                            this.$axios.post("/user/check_user_phone.do", this.$qs.stringify({
                                mobile: this.form_1.phone
                            })).then(res=>{
                                console.log(res)
                                if(res.data.status === 0) {
                                    this.userId = res.data.data
                                    this.getQuestion()
                                    this.active++
                                } else {
                                    this.$message.error("手机号不存在")
                                }
                            })
                        } else {
                            this.$message.error("请输入正确的手机号")
                        }
                    })
                }
                if(this.active === 2) {
                    if(this.authQuestion.question === "") {
                        this.$message.error("请输入密保答案")
                        return;
                    }
                    this.$axios.post("/user/forget_check_question.do", this.$qs.stringify({
                        userId: this.userId,
                        question: this.authQuestion.question,
                        answer: this.authQuestion.answer
                    })).then(res=>{
                        if(res.data.status === 0) {
                            this.$message.success("验证成功")
                            this.active++
                        } else {
                            this.$message.error("密保答案错误")
                        }
                    })
                }
                if(this.active === 3) {
                    this.$refs['pwdForm'].validate((valid)=>{
                        if(valid) {
                            this.$axios.post("/user/reset_password.do", this.$qs.stringify({
                                userId: this.userId,
                                passwordNew: this.pwdForm.pass
                            })).then(res=>{
                                if(res.data.status === 0) {
                                    this.active++;
                                    this.goToLogin();
                                } else {
                                    this.$message.error("密码修改失败，请稍后再试")
                                }
                            })
                        }
                    })
                }
            },
            login: function () {
                this.$router.push("/login");
            },
            register: function () {
                this.$router.push("/register");
            },
            goToLogin(){
                const time_count = 3;
                if(!this.timer) {
                    this.count = time_count;
                    this.timer = setInterval(()=>{
                        if(this.count > 0 && this.count <= time_count){
                            this.count--;
                        } else {
                            clearInterval(this.timer)
                            this.timer = null;
                            this.$cookie.set('userId','',{expires:'-1'});
                            this.$store.dispatch('saveUserName','');
                            this.$store.dispatch('saveCartCount','0');
                            this.$router.push("/login")
                        }
                    }, 1000)
                }
            },
            jump() {
                this.$router.push("/login")
            },
            logout: function () {
                this.$cookie.set('userId','',{expires:'-1'})
                this.$store.dispatch('saveUserName','');
                this.$store.dispatch('saveCartCount','0');
                this.$axios.post('/user/logout.do')
                    .then((res)=>{
                        console.log(res)
                    })
                this.$router.push("/login")
                this.$message.success("退出成功")
                localStorage.clear()
            },
            goToCart: function () {
                if(this.username !== "") this.$router.push("/cart");
                else this.$router.push("/login");
            },
            goToPerson: function () {
                this.$router.push('/person');
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "./../assets/scss/base.scss";
    @import "./../assets/scss/mixin.scss";
    @import "./../assets/scss/config.scss";
    .nav-topbar{
        height: 39px;
        line-height: 39px;
        background-color: #333333;
        color: #B0B0B0;
        .container{
            @include flex();
            a{
                display: inline-block;
                color: #B0B0B0;
                margin-right: 17px;
            }
            .my-cart {
                width: 110px;
                background-color: #042dab;
                text-align: center;
                color: #ffffff;
                margin-right: 0;
                .icon-cart {
                    @include bgImg(16px, 12px,"/imgs/icon-cart.png");
                    margin-right: 6px;
                }
            } }
    }
    .username {
        font-size: 20px;
        margin-top: 10px;
        text-align: center;
    }
    .function {
        margin-top: 12px;
        text-align: center;
        font-size: 16px;
        a {
            color: #333333;
            display: flex;
            flex-direction: column;
            margin-bottom: 5px;
            cursor: pointer;
            &:hover {
                color: #FF6600;
            }
        }
    }
    .check-form {
        width: 80%;
        margin: 30px auto;
    }
    .check-user p{
        font-size: 20px;
        text-align: center;
        font-weight: bold;
        margin-bottom: 30px;
    }
</style>
