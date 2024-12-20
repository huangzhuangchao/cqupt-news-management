import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import MainBox from '@/views/MainBox.vue'
import routesConfig from './config'
import {useGetterRouterSrore} from '@/stores/counter'
import { useUserInfoStore } from '@/stores/userInfoStore'

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
  if(!router.hasRoute("mainbox")){
    router.addRoute({
      path: '/mainbox',
      name: 'mainbox',
      component: MainBox
    })
  }
  getterStore.changeGetterRouter(true)
  routesConfig.forEach(item =>{
    checkPermission(item) && router.addRoute("mainbox", item);
  })
}
const checkPermission = (item)=>{
  const userInfoStore = useUserInfoStore()
  if(item.requireIsAdmin){
    return userInfoStore.userInfo.role == 1
  }
  return true
}

//每次路由跳转之前执行
router.beforeEach((to, from, next) =>{
  const getterStore = useGetterRouterSrore()
  if(to.name === "login"){
    // getterStore.changeGetterRouter(false) //每次跳转到login需要改为false，这样每次登录进去才会渲染一遍权限控制的方法。优化一下，在登录成功时置为false
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

        //删除所有嵌套路由，路由不好删就删mainbox
        router.removeRoute("mainbox")
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
