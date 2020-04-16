<template>
    <div class="login">
        <div class="container">
            <a href="/#/index"><img src="/imgs/SHU.jpeg" alt=""></a>
            <div class="login-title">品牌服饰空中商城</div>
        </div>
        <div class="wrapper">
            <div class="container">
                <div class="login-form">
                    <h3>
                        <span class="checked">帐号登录</span>
                    </h3>
                    <div class="input">
                        <el-input v-model="username" placeholder="请输入用户名"></el-input>
                    </div>
                    <div class="input">
                        <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
                    </div>
                    <div class="btn-box">
                        <el-button type="primary" @click="login">登录</el-button>
                    </div>
                    <div class="tips">
                        <div class="sms" @click="register">立即注册</div>
                        <div class="reg" @click="forget_pwd">忘记密码？</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <p class="copyright">Copyright ©2019 www.shu.com All Rights Reserved.</p>
        </div>
    </div>
</template>
<script>
    // import { mapActions } from 'vuex';
    export default {
        name: 'login',
        data(){
            return {
                username:'',
                password:'',
                userId:''
            }
        },
        methods:{
            login(){
                let username = this.username;
                let password = this.password;
                this.$axios.post('user/login.do', this.$qs.stringify({
                    username: username,
                    password: password
                })).then(res=>{
                    console.log(res)
                    if(res.data.status === 0) {
                        this.$cookie.set('userId',res.data.data.id,{expires:'Session'});
                        localStorage.setItem("isLogin", "1");
                        this.$store.dispatch('saveUserName',res.data.data.username);
                        // this.$store.state.saveUserName(res.username);
                        this.$router.push({
                            name:'index',
                            params:{
                                from:'login'
                            }
                        });
                    } else if(res.data.status === 1) {
                        window.alert(res.data.msg);
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            register(){
                this.$router.push("/register");
            },
            forget_pwd(){

            }
        }
    }
</script>
<style lang="scss">
    @import './../assets/scss/base.scss';
    .login{
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
                        height:50px;
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
