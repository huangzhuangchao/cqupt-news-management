<script setup>
import { computed, onMounted } from 'vue';
import { useUserInfoStore } from '@/stores/userInfoStore';
import axios from 'axios';
const userInfoStore = useUserInfoStore()

const avatarUrl = computed(() => {
    return userInfoStore.userInfo.avatar ? `http://localhost:3000/`+ userInfoStore.userInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})

const welcomText = computed(() => {
    const hour = new Date().getHours()
    if (hour < 12) return ["早上好呀", "祝您有愉快的一天！🌞"]
    else if (hour < 14) return ["中午好", "再忙也要记得午休喔！🕐"]
    else if (hour < 18) return ["下午好", "工作久了起来动动喔！☕"]
    else if (hour < 21) return ["晚上好", "记得早点下班回家！🏠"]
    else return ["夜深了", "记得早点休息！🌃"]
})

//更优美的写法：
// const avatarUrl = computed(() => userInfoStore.userInfo.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const loopData = ref([])

onMounted(async ()=>{
    const res = await axios.get("/adminapi/product/list")
    console.log(res.data);
    loopData.value = res.data.data
    // console.log(tableData.value);
    console.log(loopData.value[0].cover);
    
})

</script>

<template>

    <div>
        <el-page-header icon="">
            <template #content>
                <span> 首页 </span>
            </template>
            <template #title>
                <span> 重邮新闻管理发布系统 </span>
            </template>
        </el-page-header>

        <el-card>
            <el-row>
                <el-col :span="4">
                    <el-avatar :size="80" :src="avatarUrl" />
                </el-col>
                <el-col :span="20">
                    <h3 style="line-height: 80px;">{{ welcomText[0] }}, {{ userInfoStore.userInfo.username }}。 {{
                        welcomText[1] }}
                    </h3>
                </el-col>
            </el-row>
        </el-card>
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>校园周边文创</span>
                </div>
            </template>
            <!-- 走马灯 -->
            <el-carousel :interval="4000" type="card" height="400" v-if="loopData.length">
                <el-carousel-item v-for="item in loopData" :key="item._id">
                    <div :style="{backgroundImage:`url(http://localhost:3000${item.cover})`, backgroundSize:'cover'}">
                        <h3  justify="center">{{ item.title }}</h3>
                    </div>
                </el-carousel-item>
            </el-carousel> 
        </el-card>
    </div>

</template>

<style scoped lang="scss">
.el-card {
    margin-top: 40px;
}

.el-carousel__item h3 {
    color: #dde2e7;
    opacity: 0.75;
    line-height: 400px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

</style>
