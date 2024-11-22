<script setup>
import { useCollapsedStore } from '@/stores/collapsedStore'
import { useUserInfoStore } from '@/stores/userInfoStore';
import { Menu, User,Fold,Expand} from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
const collapsedStore = useCollapsedStore()
const userInfoStore = useUserInfoStore()
const router = useRouter()
const handleCenter = ()=>{
    router.push('/center')
}
const exit = ()=>{
    localStorage.removeItem("token")
    console.log("befor", userInfoStore.userInfo);
    userInfoStore.clearUserInfo();
    console.log("af", userInfoStore.userInfo)
    
    router.push('/login')
}
</script>
<template>
    <el-header>
        <!-- <button @click="collapsedStore.collapse">click</button> -->
        <div class="left">
            <el-icon @click="collapsedStore.collapse">
                <template v-if="collapsedStore.isCollapsed">
                    <Expand />
                </template>
                <template v-else> 
                    <Fold />
                </template>
            </el-icon>
            <span>重邮新闻管理发布系统</span>
        </div>
        <div class="right">
            <span>欢迎您: {{ userInfoStore.userInfo.username }}</span>
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-icon :size="18" color="white"><User /></el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
                        <el-dropdown-item @click="exit">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>
<style lang="scss" scoped>
    .el-header{
        background-color: #2d3a4b;
        display: flex;
        justify-content: space-between;
        color: #fff;
        height: 60px;
        line-height: 60px;
        align-items: center;      
        .right, .left{
            display: flex;
            align-items: center;
        }
        .left{
            cursor: pointer;
        }
        .left span{
            margin-left: 10px;
        }
        .right span{
            margin-left: 3px;
        }
        .el-dropdown-link:focus-visible{
            outline:none
        }
    }
</style>