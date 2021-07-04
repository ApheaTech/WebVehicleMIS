<template>
  <div id="app-login">
        <el-row>
            <el-col :span="8" :offset="8">
                <div id="login-window">
                    <h1 class="el-icon-s-promotion"> 交通管理信息系统</h1>
                    <el-form id="login-form" :model="loginForm">
                        <el-form-item prop="account">
                            <el-input prefix-icon="el-icon-user-solid" v-model="loginForm.account"  placeholder="登录用户名"></el-input>
                        </el-form-item>
                        <el-form-item prop="passwd">
                            <el-input prefix-icon="el-icon-lock" type="password" v-model="loginForm.passwd" placeholder="密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox label="记住我" name="type"></el-checkbox>
                        </el-form-item>                        
                        <el-form-item style="margin-bottom: 0">
                            <el-button type="primary" @click="login">登录</el-button>
                        </el-form-item>
                        <el-form-item style="margin-bottom: 0">
                            <el-button type="text" @click="dialogRegisterVisible = true">注册</el-button>
                        </el-form-item>
                    </el-form>
                    <el-dialog
                        title="提示"
                        :visible.sync="dialogRegisterVisible"
                        width="30%"
                        center>
                        <span>暂不开放注册，请联系管理员 17723084560</span>
                    </el-dialog>
                    <el-tooltip class="item" effect="dark" placement="right-end">
                        <i class="el-icon-key" id="tips"></i>
                        <div slot="content">
                            {{tip1}}<br>
                            {{tip2}}
                        </div>
                    </el-tooltip>
                </div>
            </el-col>
        </el-row>
    
  </div>
</template>

<script>
    import axios from 'axios'
    import md5 from 'js-md5'
    import router from '../router'
    export default {
        data(){
            return {
                loginForm: {
                    account: "",
                    passwd: ""
                },
                dialogRegisterVisible: false,
                tip1: "1.数据已作脱敏处理",
                tip2: "2.管理员账号sixu 密码123456"
            }
        },
        methods: {
            login() {
                axios.post('http://127.0.0.1:9090/user/login', {
                    userAccount: this.loginForm.account,
                    passwd: md5(this.loginForm.account+this.loginForm.passwd)
                })
                .then(res => {
                    // console.log(res)
                    if(res.data == true){
                        localStorage.setItem("isLogin", 'true')
                        localStorage.setItem("account", this.loginForm.account)
                        router.push('/home')
                    }else{
                        router.push('/login')
                    }
                    
                })
            },
            
        }
    }

</script>


<style>
#app-login {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-image: url(../assets/login-back.png);
  background-position-y: center;
  height: 955px;
}
#login-window {
    margin-top: 200px;
    margin-left: auto;
    margin-right: auto;
    background: #ffffff;
    height: 365px;
    width: 400px;
    border-radius: 30px;
    padding: 50px;
}
#login-form {
    width: 250px;
    margin: 30px auto auto auto;
}
#login-window h1 {
    margin-top: 30px;
    margin-bottom: 30px;
}
#tips {
    margin-left: 400px;
    margin-top: 0px;
}
</style>
