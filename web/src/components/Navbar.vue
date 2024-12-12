<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>
<template>
    <div class="navbar">
        <el-menu 
        :default-active="route.fullPath" 
        class="el-menu-demo" 
        mode="horizontal" 
        @select="handleSelect"
        :router="true"
        >
        <el-menu-item index="/">首页</el-menu-item> 
        <el-menu-item index="/news">校园新闻</el-menu-item>
        <el-menu-item index="/product">校园周边</el-menu-item>
    </el-menu>
    <div class="right">校园门户官网</div>
    </div>
</template>
<style scoped>
.navbar{
    position: sticky;
    top: 0px;
}
.right{
    position: fixed;
    top: 0;
    right: 20px;
    height: 60px;
    line-height: 60px;
    text-align: center;
}
</style>