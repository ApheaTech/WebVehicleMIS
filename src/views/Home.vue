<template>
  <div id="app-home">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="6" :offset="1">
            <h1 class="el-icon-s-promotion"> 交通管理信息系统</h1>
          </el-col>
          <el-col :span="2" :offset="14">
            <span>欢迎您, {{ userName }}</span>
          </el-col>
          <el-col :span="1" :offset="0">
            <el-button type="info" @click="loginOut" style="color: #ffffff">退出</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="/home/carInfo"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router=true>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span>系统管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home/userInfo">用户管理</el-menu-item>
                <el-menu-item index="/home/orgInfo">角色管理</el-menu-item>
                <el-menu-item index="/home/orgInfo">组织管理</el-menu-item>
                <el-menu-item index="/home/orgInfo">数据字典</el-menu-item>
                <el-menu-item index="/home/orgInfo">操作日志</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-truck"></i>
                <span>车辆管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home/carInfo">车辆技术档案</el-menu-item>
                <el-menu-item index="2-2">车辆年检信息</el-menu-item>
                <el-menu-item index="2-2">车辆保险信息</el-menu-item>
                <el-menu-item index="2-2">车辆维修信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-wallet"></i>
                <span>驾驶员管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home/driverInfo">驾驶员技术档案</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-odometer"></i>
                <span>车辆调派</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home/driverInfo">用车申请</el-menu-item>
                <el-menu-item index="/home/driverInfo">部门审批</el-menu-item>
                <el-menu-item index="/home/driverInfo">领导审批</el-menu-item>
                <el-menu-item index="/home/driverInfo">车辆调度</el-menu-item>
                <el-menu-item index="/home/driverInfo">回场确认</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
  data(){
    return {
      tableData: [],
      dialogFormVisible: false,
      visible: true,
      userName: ''
    }
  },
  created(){
    this.getUserByAccount(localStorage.getItem("account"))
  },
  methods: {
    getUserByAccount(account) {
      axios
        .get('http://127.0.0.1:9090/user/account', {
          params: {
            userAccount: account
          }
        }).then(res => {
          this.userName = res.data.userName
      })
    },
    loginOut() {
      localStorage.setItem("isLogin", false)
      router.push('/login')
    },
    handleClick(row) {
      console.log(row);
    }
  }
}
</script>

<style>

#app-home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app-home .el-header {
  background-color: #409eff;
  color: #ffffff;
  text-align: left;
  line-height: 60px;
}

</style>
