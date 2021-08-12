import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Carinfo from '../views/carManage/carInfo.vue'
import OrgInfo from '../views/systemManage/orgInfo.vue'
import UserInfo from '../views/systemManage/userInfo.vue'
import DriverInfo from '../views/driverManage/driverInfo.vue'
import DashBoard from "@/views/Dashboard";

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home'
  },{
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/home/dashboard',
    children:[{
      path: 'dashboard',
      component: DashBoard
    },{
      path: 'carInfo',
      component: Carinfo
    },{
      path: 'orgInfo',
      component: OrgInfo
    },{
      path: 'userInfo',
      component: UserInfo
    },{
      path: 'driverInfo',
      component: DriverInfo
    }]
  },{
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.path == "/login") {
    next()
    return
  }
  let login = localStorage.getItem("isLogin");
  if(login == 'true') {
    next()
    return;
  }else {
    console.log('no')
    next('/login')
    return;
  }
})

export default router
