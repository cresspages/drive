<template>
        <transition name="fade">
    <div id="login">
            <el-container>
                <el-header>
                    <h2>管理系统</h2>
                </el-header>
                <el-main>
                    <div class="user">
                        <el-input v-model="user" @blur="userblur" placeholder="请输入账号" clearable></el-input>
                        <div class="tips-user"></div>
                    </div>
                    <div class="password">
                        <el-input v-model="password" @blur="passwordblur" placeholder="请输入密码" show-password></el-input>
                        <div class="tips-password"></div>
                    </div>
                    <div class="submit">
                        <el-button type="primary" @click="login">登录</el-button>
                        <el-button @click='clear'>重置</el-button>
                    </div>
                </el-main>
                <el-footer>Copyright © 2019-2020 管理系统 - Version V1.1</el-footer>
            </el-container>
    </div>
        </transition>
</template>

<script>

    import axios from 'axios';
    import qs from 'qs';

    export default {
        data(){
            return {
                user: '',
                password: ''
            }
        },
        methods: {
            userblur(e){
                let elem = e.target.parentElement.nextElementSibling;
                if(this.user == ''){
                    elem.innerText = '账号不能为空';
                    e.target.setAttribute('style', 'border-color: red;');
                } else {
                    elem.innerText = '';
                    e.target.setAttribute('style', 'border-color: #ccc;');
                }
            },
            passwordblur(e){
                let elem = e.target.parentElement.nextElementSibling;
                if(this.password == ''){
                    elem.innerText = '密码不能为空';
                    e.target.setAttribute('style', 'border-color: red;');
                } else {
                    elem.innerText = '';
                    e.target.setAttribute('style', 'border-color: #ccc;');
                }
            },
            clear(){
                this.user = '';
                this.password = '';
            },
            login(){
                let that = this;

                let parmas = {
                        table: 'admin',
                        user: this.user,
                        password: this.password
                    }

                axios.post('/loginport', qs.stringify(parmas)).then((res) => {

                    switch (res.data) {
                        case 0:
                            console.log('数据库报错')
                            break;
                        case 1:
                            that.$message({
                                showClose: true,
                                message: '登录成功',
                                type: 'success'
                                });
                            sessionStorage.setItem(this.user, 'true');
                            that.$router.push('/');
                            break;
                        case 2:
                            that.$message.error('密码错误');
                            break;
                        case 3:
                            that.$message({
                                message: '用户不存在',
                                type: 'warning'
                            });
                            break;
                    }

                })
            },
        },
        created(){
            sessionStorage.removeItem('cress');
        }
    }
</script>

<style scoped>

    @import '../assets/css/home.css';
    @import '../assets/css/public.css';

    .fade-enter-active {
        transition: opacity 1s;
    }
    .fade-enter /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    #login{
        width: 100%;
        height: 100%;
        background-size: cover;
        background-image: url(../assets/img/loginbg.jpg);
    }

    .el-container{
        display: inline-block;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 0 10px #aaa;
        text-align: center;
        border-radius: 5px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        min-width: 445px;
    }

    .el-header{
        color: #0663a2;
    }

    .el-main{
        padding: 10px 0;
    }

    .user, .password{
        margin: 10px 0;
    }

    .input-error:focus{
        border-color: red;
    }

    .tips-user, .tips-password{
        color: red;
        height: 30px;
        font-size: 14px;
        text-align: left;
    }

    .el-footer{
        line-height: 60px;
        color: #aaa;
    }
</style>