<script setup>
import axios from 'axios';
import { onMounted, ref, watchEffect } from 'vue'
import { useRoute,useRouter } from 'vue-router';
import moment from 'moment';
import { StarFilled } from '@element-plus/icons-vue';
const route = useRoute()
const router = useRouter()
const currentNews = ref({})
const topNews = ref([])
const whichTime = time => {
    return moment(time).format("YYYY/MM/DD HH:mm")
}
watchEffect(async () => {
    const res = await axios.get(`/webapi/news/list/${route.params.id}`)
    const topnews = await axios.get(`/webapi/news/toplist?limit=4`)
    // console.log(res.data);
    console.log(topnews.data.data);
    currentNews.value = res.data.data[0]
    topNews.value = topnews.data.data
})
const handleChange = (id)=>{
    router.push(`/news/${id}`)
}
</script>
<template>
    <el-row>
        <el-col :span="17" :offset="1">
            <div>
                <h2>
                    {{ currentNews.title }}
                </h2>
                <div class="time">
                    {{ whichTime(currentNews.editTime) }}
                </div>
                <el-divider>
                    <el-icon><star-filled /></el-icon>
                </el-divider>
                <div v-html="currentNews.content"></div>
            </div>
        </el-col>
        <el-col :span="3" :offset="2" :pull="1">
            <el-card>
                <template #header>
                    <div class="card-header" style="font-weight: bold; font-size: 16px">
                        <span>最近新闻</span>
                    </div>
                </template>
                <div v-for="item in topNews" :key="item._id" class="topnews" @click="handleChange(item._id)">
                  <div style="margin-bottom: 5px;">  {{ item.title }}</div>
                    <div class="time">
                        {{ whichTime(currentNews.editTime) }}
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
<style scoped lang="scss">
.el-col {
    margin-top: 20px;

    .time {
        color: gray;
    }

    .topnews {
        font-size: 13px;
        margin-bottom: 10px;
    }
}
</style>