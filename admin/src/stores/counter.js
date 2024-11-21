import { ref } from 'vue'
import { defineStore } from 'pinia'
// 这个拿来判断是不是已经登录过了
export const useGetterRouterSrore = defineStore('getterrouter', ()=>{
  const isGetterRouter = ref(false)
  function changeGetterRouter(val){
    isGetterRouter.value = val
  }
  return {isGetterRouter, changeGetterRouter}
})