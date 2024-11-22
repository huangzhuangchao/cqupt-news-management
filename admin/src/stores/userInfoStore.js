import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useUserInfoStore = defineStore("userInfo", () => {
    let userInfo = reactive({})
    const changeUserInfo = (value) => {
        // 使用 Object.assign 合并对象
        Object.assign(userInfo, value)
    }
    const clearUserInfo = ()=>{
        for(let item in userInfo){
            userInfo[item] = null
        }
    }
    
    return { userInfo, changeUserInfo, clearUserInfo}

},
    {
        persist: true,
    })