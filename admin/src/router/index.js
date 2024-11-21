import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import MainBox from '@/views/MainBox.vue'
import routesConfig from './config'
import {useGetterRouterSrore} from '@/stores/counter'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/mainbox',
      name: 'mainbox',
      component: MainBox
    },
    //mainbox得嵌套路由，后面根据权限动态添加
  ]
})

const configRouter = (getterStore)=>{
  getterStore.changeGetterRouter(true)
  routesConfig.forEach(item =>{
    router.addRoute("mainbox", item)
   
  })
}

//每次路由跳转之前执行
router.beforeEach((to, from, next) =>{
  const getterStore = useGetterRouterSrore()
  if(to.name === "login"){
    next()
  }else{
    // 如果授权（已经登录过了） next（）
    //未授权，重定向到login
    if(!localStorage.getItem("token")){
      next({
        path:"/login"
      })
    }else{
      if(!getterStore.isGetterRouter){
         //本地存储登录信息后，第一次登录时
        configRouter(getterStore)
        next({
          path: to.fullPath
        })
      }else{
        next()
      }
    }
  }
})

export default router
