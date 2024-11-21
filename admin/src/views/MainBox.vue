<script setup>
import SideMenu from '@/components/mainbox/SideMenu.vue';
import TopHeader from '@/components/mainbox/TopHeader.vue';
</script>
<template>
    <el-container >
      <SideMenu></SideMenu>
      <el-container direction="vertical">
        <TopHeader></TopHeader>
        <el-main><RouterView></RouterView></el-main>
      </el-container>
    </el-container>
</template>