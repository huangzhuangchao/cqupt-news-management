<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
const looplist = ref([])
onMounted(async () => {
    const res = await axios.get('/webapi/product/list')
    console.log(res.data);
    looplist.value = res.data.data
})
</script>
<template>
    <el-carousel height="calc(100vh - 60px)" direction="vertical" :autoplay="false" v-if="looplist.length">
        <el-carousel-item v-for="item in looplist" :key="item._id">
            <div class="content">
                <!-- <h3 justify="center">{{ item.title }}</h3> -->
                <div class="bg" :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }">
                    <el-card style="width: 30%; height: 100%; background-color: rgba(255, 255, 255, .7);" shadow="hover">
                        <template #header>
                            <h2>{{ item.title }}</h2>
                        </template>
                        <div>{{ item.introduction }}</div>
                       <div style="margin-bottom: 15px; margin-top: 15px;">{{ item.detail }}</div>
                       <div >
                        更多内容，请访问：
                        <br>
                       <a href="https://huangzhuangchao.github.io/">https://huangzhuangchao.github.io/</a>
                       </div>
                    </el-card>
                </div>
            </div>
        </el-carousel-item>
    </el-carousel>
    <el-empty description="description" v-else />
</template>
<style scoped>
.demonstration {
    color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.content {
    height: 100%;
    position: relative;

    h3 {
        position: absolute;
        left: 50%;
        top: 7%;
        font-size: 50px;
        transform: translate(-50%, -50%);
        color: white;
    }

    .bg {
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
}
</style>