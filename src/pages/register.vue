<template>
    <div class="register">
        <div class="container">
            <a href="/#/index"><img src="/imgs/SHU.jpeg" alt=""></a>
            <div class="login-title">品牌服饰空中商城</div>
        </div>
        <div class="wrapper">
            <div class="container">
                <div class="login-form">
                    <h3>
                        <span class="checked">帐号注册</span>
                    </h3>
                    <el-steps :active="active">
                        <el-step title="手机号验证" icon="el-icon-mobile">
                        </el-step>
                        <el-step title="填写账号信息" icon="el-icon-user-solid">
                        </el-step>
                        <el-step title="注册成功" icon="el-icon-check">
                        </el-step>
                    </el-steps>
                    <div class="auth-phone"
                            v-show="active === 1">
                        <el-form ref="form_1" :model="form_1" :rules="rules">
                            <el-form-item label="手机号" prop="phone">
                                <el-input v-model="form_1.phone" placeholder="请输入手机号"></el-input>
                            </el-form-item>
                            <el-form-item label="验证码" :rules="[
                                {required: true, message: '请输入验证码', trigger: 'blur'}
                            ]">
                                <el-input v-model="form_1.captcha"></el-input>
                            </el-form-item>
                            <div class="phone-button-group">
                                <el-button @click="getCaptcha">获取验证码</el-button>
                                <el-button @click="check_phone('form_1')">验证手机号</el-button>
                            </div>
                        </el-form>
                    </div>
                    <div class="fill-person-info" v-show="active === 2">
                        <el-form ref="form_2" :model="form_2" :rules="rules">
                            <el-form-item label="昵称" prop="name"
                            :rules="[
                                {required: true, message: '昵称不能为空', trigger: 'blur'}
                            ]"
                            style="display: flex; flex-direction:row; margin-top: 6px">
                                <el-input v-model="form_2.name" placeholde="请输入昵称" size="small" maxlength="15"
                                          show-word-limit></el-input>
                            </el-form-item>
                            <el-form-item label="性别"
                                          :rules="[
                                {required: true, message: '昵称不能为空', trigger: 'blur'}
                            ]"
                            style="margin-top: -6px">
                                <el-select v-model="form_2.sex" placeholder="请选择性别" size="small">
                                    <el-option label="男" value="1"></el-option>
                                    <el-option label="女" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email"
                                          :rules="[
                                                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                                                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                                            ]"
                                          style="display: flex; flex-direction:row;margin-top: -13px ">
                                <el-input size="small" v-model="form_2.email"></el-input>
                            </el-form-item>
                            <el-form-item label="密保问题" prop="question"
                                          style="margin-top: -3px; margin-left: -20px"
                                            size="small">
                                <el-select v-model="form_2.question" placeholder="问题一">
                                    <el-option label="问题一" value="question1"></el-option>
                                    <el-option label="问题二" value="question2"></el-option>
                                    <el-option label="问题三" value="question2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="密保答案"
                                          style="display: flex; flex-direction:row; margin-left: -20px " size="small" >
                                <el-input placeholder="答案一" maxlength="10" show-word-limit v-model="form_2.answer" ></el-input>
                            </el-form-item>
                            <el-button @click="submit_info('form_2')" style="margin-left: 47px">提交</el-button>
                        </el-form>
                    </div>
                    <div v-show="active === 3"></div>
<!--                    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>-->
                </div>
            </div>
        </div>
        <div class="footer">
            <p class="copyright">Copyright ©2019 www.shu.com All Rights Reserved.</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "register",
        data() {
            return{
                active: 3,
                get_captcha: false,
                form_1: {
                    phone: '',
                    captcha:''
                },
                form_2: {
                    name: '',
                    sex: '',
                    email:'',
                    question:'',
                    answer:'',
                },
                rules: {
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur'},
                        { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur'},
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
        methods: {
            // next() {
            //     if (this.active++ > 2) this.active = 1;
            // },
            getCaptcha() {
                this.get_captcha = true
            },
            check_phone(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        this.active++
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            submit_info(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        this.active++
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }

        }
    }
</script>

<style scoped lang="scss">
    @import './../assets/scss/base.scss';
    .register{
        &>.container{
            display: flex;
            flex-direction: row;
            height:113px;
            img{
                margin-top: 30px;
                width:55px;
                height:55px;
            }
            .login-title{
                margin-top: 42px;
                margin-left: 6px;
                font-size: 20px;
            }
        }
        .wrapper{
            background:url('/imgs/login-bg.jpg') no-repeat center;
            .container{
                height:576px;
                .login-form{
                    box-sizing: border-box;
                    padding-left: 31px;
                    padding-right: 31px;
                    width:410px;
                    height:510px;
                    background-color:#ffffff;
                    position:absolute;
                    bottom:29px;
                    right:0;
                    h3{
                        line-height:23px;
                        font-size:24px;
                        text-align:center;
                        margin:40px auto 49px;
                        .checked{
                            color:#042dab;
                        }
                        .sep-line{
                            margin:0 32px;
                        }
                    }
                    .input{
                        display:inline-block;
                        width:348px;
                        border:1px solid #E5E5E5;
                        margin-bottom:20px;
                        input{
                            width: 100%;
                            height: 100%;
                            border: none;
                            padding: 18px;
                        }
                    }
                    .btn{
                        width:100%;
                        line-height:50px;
                        margin-top:10px;
                        font-size:16px;
                    }
                    .tips{
                        margin-top:14px;
                        display:flex;
                        justify-content:space-between;
                        font-size:14px;
                        cursor:pointer;
                        .sms{
                            color:#042dab;
                        }
                        .reg{
                            color:#999999;
                            span{
                                margin:0 7px;
                            }
                        }
                    }
                }
            }
        }
        .footer{
            height:100px;
            padding-top:60px;
            color:#999999;
            font-size:16px;
            text-align:center;
            .footer-link{
                a{
                    color:#999999;
                    display:inline-block;
                }
                span{
                    margin:0 10px;
                }
            }
            .copyright{
                margin-top:13px;
            }
        }
    }
</style>
