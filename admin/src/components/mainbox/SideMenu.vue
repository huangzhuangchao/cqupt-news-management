<script setup>
import { HomeFilled, Avatar, UserFilled, MessageBox, Reading } from '@element-plus/icons-vue';
import {useCollapsedStore} from '@/stores/collapsedStore';
import { useRoute } from 'vue-router';
import { useUserInfoStore } from '@/stores/userInfoStore';
const collapsedStore = useCollapsedStore()
const userInfoStore = useUserInfoStore()
const route = useRoute()

console.log(route);
const vAdmin = {
    mounted(el){
        
       if(userInfoStore.userInfo.role !== 1){
            el.parentNode.removeChild(el)
       }
    }
}
</script>
<template>
    <el-aside width="auto">
        <el-menu :collapse="collapsedStore.isCollapsed" 
        :router="true"
        :default-active="route.fullPath"
        >
            <!-- index唯一不重复 -->
            <el-menu-item index="/home">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/center">
                <el-icon>
                    <Avatar />
                </el-icon>
                <span>个人中心</span>
            </el-menu-item>
            <el-sub-menu index="/user-manage" v-admin>
                <template #title>
                    <el-icon>
                        <UserFilled />
                    </el-icon>
                    <span>用户管理</span>
                </template>
                <el-menu-item index="/user-manage/adduser">添加用户</el-menu-item>
                <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="/news-manage">
                <template #title>
                    <el-icon>
                        <MessageBox />
                    </el-icon>
                    <span>新闻管理</span>
                </template>
                <el-menu-item index="/news-manage/addnews">添加新闻</el-menu-item>
                <el-menu-item index="/news-manage/newslist">新闻列表</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="/product-manage">
                <template #title>
                    <el-icon>
                        <Reading />
                    </el-icon>
                    <span>校园周边</span>
                </template>
                <el-menu-item index="/product-manage/addproduct">添加物品</el-menu-item>
                <el-menu-item index="/product-manage/productlist">物品列表</el-menu-item>
            </el-sub-menu>
        </el-menu>
    </el-aside>

</template>

<style lang="scss" scoped>
.el-aside {
    height: 100vh;
    .el-menu{
        height: 100vh;
    }
}
</style>