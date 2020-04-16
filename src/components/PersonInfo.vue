<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="昵称">
                <el-col :span="11">
                    <el-input :disabled="change" maxlength="12" show-word-limit placeholder="Dewily" v-model="form.name"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="性别">
                <el-select :disabled="change" v-model="form.sex" placeholder="请选择性别">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-col :span="11">
                    <el-input :disabled="change" v-model="form.phone"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="邮箱" prop="email"
                :rules="[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]">
                <el-input :disabled="change" v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="密保问题" prop="question">
                <el-select :disabled="change" v-model="form.question" placeholder="问题一">
                    <el-option label="问题一" value="question1"></el-option>
                    <el-option label="问题二" value="question2"></el-option>
                    <el-option label="问题三" value="question2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="密保答案">
                <el-col :span="11">
                    <el-input :disabled="change" placeholder="答案一" maxlength="10" show-word-limit v-model="form.answer"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button v-if="change" type="primary" @click="modifyInfo">修改</el-button>
                <el-button v-if="!change" type="primary" @click="submitForm('form')">提交</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "PersonInfo",
        computed: {
            ...mapState(['username', 'cartCount'])
        },
        data: ()=> ({
            change:true,
            form: {
                name: '',
                phone: '',
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
        }),
        mounted() {
            this.setUserInfo();
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            setUserInfo(){
               this.form.name = this.username;
                this.$axios.post('/user/get_user_info.do', this.$qs.stringify({
                    userId: this.$cookie.get('userId')
                })).then(res => {
                    console.log(res);
                    let  result = res.data.data;
                    this.form.answer = result.answer;
                    this.form.question = result.question;
                    this.form.email = result.email;
                    this.form.phone = result.phone;
                    if(result.sex === 1) this.form.sex = "男"
                    else this.form.sex = '女'
                    // this.$store.dispatch('saveUserName', res.data.data.username);
                }).catch(error=> {
                    window.alert(error)
            })},
            modifyInfo() {
                this.change = false
            }
        }

    }
</script>

<style scoped>

</style>
