<template>
    <div>
        <div class="auth">
            <div class="check-form">
                <el-steps :active="active">
                    <el-step title="密保问题验证" icon="el-icon-setting"></el-step>
                    <el-step title="修改密码" icon="el-icon-edit"></el-step>
                    <el-step title="密码修改成功" icon="el-icon-check"></el-step>
                </el-steps>
                <div class="check-method" v-show="active === 1">
                    <el-form>
                        <el-form-item label="密保问题">
                            <el-input :disabled="true" v-model="authQuestion.question"></el-input>
                        </el-form-item>
                        <el-form-item label="密保答案">
                            <el-input placeholder="请输入密保答案" v-model="authQuestion.answer"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="update-password" v-show="active === 2">
                    <el-form :model="pwdForm" :rules="pwdRules" ref="pwdForm">
                        <el-form-item label="新密码" prop="pass">
                            <el-input type="password" v-model="pwdForm.pass" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input type="password" v-model="pwdForm.checkPass" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="update-success" v-show="active === 3">
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
                               v-show="active !==3"
                    >下一步</el-button>
                </el-row>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ChangePassword",
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
                authQuestion: {
                    question: '',
                    answer: ''
                },
                pwdForm: {
                    pass: '',
                    checkPass: ''
                },
                pwdRules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            }
        },
        mounted() {
            this.getQuestion()
        },
        methods: {
            getQuestion() {
                this.$axios.post("/user/forget_get_question.do", this.$qs.stringify({
                    userId: this.$cookie.get("userId")
                })).then(res=>{
                    this.authQuestion.question = res.data.data
                })
            },
            nextStep() {
                if(this.active === 1) {
                    if(this.authQuestion.question === "") {
                        this.$message.error("请输入密保答案")
                        return;
                    }
                    this.$axios.post("/user/forget_check_question.do", this.$qs.stringify({
                        userId: this.$cookie.get("userId"),
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
                if(this.active === 2) {
                    this.$refs['pwdForm'].validate((valid)=>{
                        if(valid) {
                            this.$axios.post("/user/reset_password.do", this.$qs.stringify({
                                userId: this.$cookie.get("userId"),
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
            }
        }
    }
</script>

<style scoped>
    .check-form {
        width: 80%;
        margin: 0 auto;
    }
    .check-method {
        text-align: center;
        margin-top: 20px;
    }
    .update-password {
        text-align: center;
        margin-top: 20px;
    }
    .update-success {
        width: 80%;
        text-align: center;
        margin-top: 20px;
    }
</style>
