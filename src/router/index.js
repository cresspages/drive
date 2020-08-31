import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/mainpage',
    name: 'mainpage',
    component: () => import('../App.vue'),
    meta: { luyou: true },
    redirect: '/mainshow',
    children: [
      // 主页路由管理
      {
        path: '/mainshow',
        name: 'mainshow',
        component: () => import('../components/mainpage.vue')
      },
      // 教练路由管理
      {
        path: '/coach',
        name: 'coach',
        meta: {  luyou: true },
        redirect: '/coach/personinfo'
      },
      {
        path: '/coach/personinfo',
        name: 'personinfo',
        component: () => import('../components/coach/personinfo')
      },
      // 学生路由管理
      {
        path: '/student',
        name: 'allstu',
        meta: {  luyou: true },
        redirect: '/student/allstu'
      },
      {
        path: '/student/singup',
        name: 'singup',
        component: () => import('../components/student/singup')
      },
      {
        path: '/student/allstu',
        name: 'allstu',
        component: () => import('../components/student/allstu')
      },
      {
        path: '/student/overstu',
        name: 'overstu',
        component: () => import('../components/student/overstu')
      },
      {
        path: '/student/allstu/fullinfo',
        name: 'fullinfo',
        component: () => import('../components/student/fullinfo')
      },
      // 财产路由管理
      {
        path: '/property',
        name: 'property',
        meta: {  luyou: true },
        redirect: '/property/PayInfo'
      },
      {
        path: '/property/PayInfo',
        name: 'PayInfo',
        component: () => import('../components/property/PayInfo')
      },
      {
        path: '/property/addPay',
        name: 'addPay',
        component: () => import('../components/property/addPay')
      },
      {
        path: '/property/description',
        name: 'description',
        component: () => import('../components/property/description')
      },
      {
        path: '/property/total',
        name: 'total',
        component: () => import('../components/property/total')
      }
    ]
  },
  {
    path: '/notpage',
    name: 'notpage',
    component: () => import('../views/notpage')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: "*",
    redirect(to){
      if(to.path == '/'){
        return '/mainshow';
      } else {
        return '/notpage';
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active'
});

export default router
