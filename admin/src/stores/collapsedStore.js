import { ref } from "vue";
import { defineStore } from "pinia";
// 控制侧边栏是否折叠
export const useCollapsedStore = defineStore("collapsed", () => {
    const isCollapsed = ref(false)
    const collapse = () => {
        isCollapsed.value = !isCollapsed.value
        console.log(isCollapsed.value);
    }
    
    return { isCollapsed, collapse }
},
    {
        persist: true,
    },)