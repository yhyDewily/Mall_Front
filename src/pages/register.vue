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
                            <el-form-item v-show="showIdentify" label="验证码">
                                <el-input v-model="form_1.captcha" placeholde="请输入验证码"></el-input>
                            </el-form-item>
                            <div class="phone-button-group">
<!--                                <el-button @click="getCaptcha">获取验证码</el-button>-->
                                <el-button @click="check_phone('form_1')" v-show="showSend">发送验证码</el-button>
                                <el-button v-show="!showSend" disabled>{{ count }}s后可以重新发送</el-button>
                                <el-button v-show="showIdentify" @click="checkIdentify">验证</el-button>
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
                            style="margin-top: -10px">
                                <el-select v-model="form_2.sex" placeholder="请选择性别" size="small">
                                    <el-option label="男" value="1"></el-option>
                                    <el-option label="女" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email"
                                          :rules="[
                                                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                                                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                                            ]"
                                          style="display: flex; flex-direction:row;margin-top: -20px ">
                                <el-input size="small" v-model="form_2.email"></el-input>
                            </el-form-item>
                            <el-form-item label="密保问题" prop="question"
                                          style="margin-top: -20px; margin-left: -20px"
                                            size="small">
                                <el-select v-model="form_2.question" placeholder="问题一">
                                    <el-option label="问题一" value="question1"></el-option>
                                    <el-option label="问题二" value="question2"></el-option>
                                    <el-option label="问题三" value="question2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="密保答案"
                                          style="display: flex; flex-direction:row; margin-left: -20px; margin-top: -10px " size="small" >
                                <el-input placeholder="答案一" maxlength="10" show-word-limit v-model="form_2.answer" ></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password"
                                          style="display: flex; flex-direction:row;margin-top: -15px ">
                                <el-input type="password" v-model="form_2.password" autocomplete="off" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="checkPass"
                                          style="display: flex; flex-direction:row; margin-left: -30px; margin-top: -10px ">
                                <el-input type="password" v-model="form_2.checkPass" autocomplete="off" size="small"></el-input>
                            </el-form-item>
                            <el-button @click="submit_info('form_2')" style="margin-left: 47px">提交</el-button>
                        </el-form>
                    </div>
                    <div v-show="active === 3">
                        <div class="register-success"
                            style="font-size: 25px; text-align: center; margin-top: 20px"
                        >注册成功，将在{{ count }}秒后跳转到登录页面，或点击下面按钮直接跳转</div>
                        <el-button @click="jump"
                                type="success" round
                                   style="margin-left: 130px; margin-top: 20px"
                        >确定</el-button>
                    </div>
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
            const validatePass = (rule, value, callback) => {
                if(value.toString().length<6) callback(new Error('密码长度不得小于6'))
                if (value === '') {
                    callback(new Error('请输入密码'))
                } else {
                    if (this.form_2.checkPass !== '') {
                        this.$refs.form_2.validateField('checkPass');
                    }
                    callback();
                }
            };
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form_2.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                showSend: true,
                showIdentify: false,
                active: 1,
                count: '',
                get_captcha: false,
                reSend: false,
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
                    password: '',
                    checkPass: ''
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
                    ],
                    password: [
                        {
                            required: true,
                            validator: validatePass,
                            // pattern: /^[a-zA-Z\d_]{6,}$/,
                            trigger: 'blur'
                        },
                        // {
                        //     required: true,
                        //     trigger: 'blur',
                        //     message: '密码长度必须在6-18之间且以字母开头'
                        // }
                    ],
                    checkPass: [
                        {
                            required: true,
                            validator: validatePass2,
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },

        created() {

        },
        methods: {
            // next() {
            //     if (this.active++ > 2) this.active = 1;
            // },
            getCaptcha() {
                this.get_captcha = true
            },
            redirectPath() {
                if(localStorage.getItem("isLogin")) {
                    this.$router.push("/index")
                }
            },
            check_phone(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/user/sendSms.do", this.$qs.stringify({
                            mobile: this.form_1.phone
                        })).then(res=>{
                            console.log(res)
                            if(res.data.status === 1){
                                this.$message.error("手机号已存在")
                                return
                            } else {
                                this.$message.success("验证码发送成功");
                                this.countSend();
                                this.showIdentify = true;
                                this.showSend = false;
                            }
                        })
                        // this.active++
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            submit_info(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/user/register.do", this.$qs.stringify({
                            sex: this.form_2.sex,
                            username: this.form_2.name,
                            password: this.form_2.password,
                            email: this.form_2.email,
                            phone: this.form_1.phone,
                            question: this.form_2.question,
                            answer: this.form_2.answer
                        })).then(res=>{
                            console.log(res)
                            if(res.data.status === 0) {
                                this.$message.success(res.data.msg);
                                this.active++;
                                this.goToLogin();
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            checkIdentify() {
                if(this.form_1.captcha === "") {
                    this.$message.error("请输入验证码")
                    return
                } else {
                    this.$axios.post("/user/check_identify.do",this.$qs.stringify({
                        mobile: this.form_1.phone,
                        identifyCode: this.form_1.captcha
                    })).then(res=>{
                        console.log(res)
                        if(res.data.status === 0) {
                            this.$message.success("验证成功")
                            this.active++
                        } else {
                            this.$message.error("验证码错误")
                        }
                    })
                }
            },
            countSend() {
              const time_count = 60;
              if(!this.timer) {
                  this.count = time_count;
                  this.show = false;
                  this.timer = setInterval(()=>{
                      if(this.count > 0 && this.count <=time_count) {
                          this.count--;
                      } else  {
                          this.show = true;
                          clearInterval(this.timer)
                          this.timer = null;
                          this.showSend = true;
                      }
                  }, 1000)
              }
            },
            goToLogin(){
                const register_count = 3;
                if(!this.timer) {
                    this.count = register_count;
                    this.show = false;
                    this.timer = setInterval(()=>{
                        if(this.count > 0 && this.count <= register_count){
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer)
                            this.timer = null;
                            this.$router.push("/login")
                        }
                    }, 1000)
                }

            },
            jump() {
                this.$router.push("/login")
            }

        },
        mounted() {
            window.onbeforeunload = function () {
                var storage = window.localStorage;
                this.$cookie.remove("userId")
                storage.clear()
                localStorage.clear()
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
            background:url('/imgs/login-bg.jpeg') no-repeat center;
            width: 80%;
            margin: 0 auto;
            .container{

                height:578px;
                .login-form{
                    box-sizing: border-box;
                    padding-left: 31px;
                    padding-right: 31px;
                    width:412px;
                    height:556px;
                    background-color:#ffffff;
                    position:absolute;
                    bottom:20px;
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
