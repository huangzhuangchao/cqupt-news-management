<script setup>
import bg from '@/assets/bg1.jpg'
import { Search } from '@element-plus/icons-vue';
import { computed, onMounted, ref } from 'vue';
import moment from 'moment';
import axios from 'axios';
import _ from 'lodash'
import { useRouter } from 'vue-router';
const router = new useRouter()
const searchText = ref("")
const visible = ref(false)
const newsList = ref([])
onMounted(async () => {
    const res = await axios.get("/webapi/news/list")
    // console.log(res.data.data);
    newsList.value = res.data.data
    console.log(newsList.value);
    // console.log(_.groupBy(newsList.value, item=>item.category));


})
moment.locale("zh-CN")
const whichTime = time => {
    return moment(time).format("YYYY/MM/DD HH:mm")
}
const searchNews = computed(() =>
    searchText.value ? newsList.value.filter(item => item.title.includes(searchText.value)) : []
)
const topNewsList = computed(() => newsList.value.slice(0, 4))
const tabList = [
    {
        label: "最新动态",
        name: 1
    },
    {
        label: "典型案例",
        name: 2
    },
    {
        label: "通知公告",
        name: 3
    }
]
const activeName = ref(1)
const tabnews = computed(() => {
    return _.groupBy(newsList.value, item => item.category)
})
const handleChangepage = (id) =>{
    console.log(666, id);
    router.push(`/news/${id}`)
    
}
</script>
<template>
    <div class="container">
        <div class="news-header" :style="{ backgroundImage: `url('${bg}')` }"></div>
        <p>校园新闻</p>
        <span>给你最新的重邮校园资讯！</span>
        <div class="search">
            <el-popover placement="bottom" title="搜索结果" width="50%" trigger="click" :visible="visible">
                <template #reference>
                    <el-input v-model="searchText" class="inp" placeholder="请输入新闻关键字" size="large" type="search"
                        :prefix-icon="Search" @input="visible = true" @blur="visible = false" />
                </template>

                <div v-if="searchNews.length">
                    <div v-for="data in searchNews" :key="data._id" class="search-item" @click="handleChangepage(data._id)">{{ data.title }}</div>
                </div>
                <div v-else>
                    <el-empty description="暂无新闻" :image-size="50" />
                </div>
            </el-popover>
        </div>
        <div class="topnews">
            <el-row :gutter="20">
                <el-col :span="6" v-for="item in topNewsList" :key="item._id">
                    <!-- {{ item.title }} -->
                    <el-card style="max-width: 480px; " shadow="hover" @click="handleChangepage(item._id)" >
                        <template #footer>
                            <div class="title">{{ item.title }}</div>
                            <div> <time class="time">{{ whichTime(item.editTime) }}</time></div>
                        </template>
                        <div class="image" :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }">
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <el-tabs v-model="activeName" class="demo-tabs" 
            style="margin-left: 20px; margin-right: 20px">
            <el-tab-pane v-for="item in tabList" :key="item.name" :label="item.label" :name="item.name">
                <el-row :gutter="20">
                    <el-col :span="18">
                        <div v-for="data in tabnews[item.name]" :key="data._id" style="height: 150px;">
                            <el-card shadow="hover" @click="handleChangepage(data._id)" >
                                <div class="tabnews">
                                    <div class="tabimg"
                                        :style="{ backgroundImage: `url(http://localhost:3000${data.cover})` }">
                                    </div>
                                    <div class="right">
                                        <div class="title">{{ data.title }}</div>
                                        <div> <time class="time">{{ whichTime(data.editTime) }}</time></div>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <el-timeline>
                            <el-timeline-item v-for="(data, index) in tabnews[item.name]" :key="index"
                                :timestamp="whichTime(data.editTime)">
                                {{ data.title }}
                            </el-timeline-item>
                        </el-timeline>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <!-- <el-tab-pane label="典型案例" name="second">典型案例</el-tab-pane>
            <el-tab-pane label="通知公告" name="third">通知公告</el-tab-pane> -->
        </el-tabs>
    </div>

    <el-backtop :bottom="100" :right="100"></el-backtop>
</template>
<style scoped lang="scss">
.container {
    position: relative;
    height: 500px;

    p {
        margin: 0;
        font-size: 60px;
        position: absolute;
        color: #fff;
        top: 7%;
        left: 50%;
        transform: translate(-50%);
    }

    span {
        margin: 0;
        font-size: 20px;
        position: absolute;
        color: #fff;
        top: 25%;
        left: 60%;
    }
}

.news-header {
    height: 500px;
    width: 100%;
    background-size: cover;
    display: block;
}

.search {
    position: absolute;
    width: 100%;
    top: 35%;
    text-align: center;
}

.inp {
    width: 50%;
}

.search-item {
    height: 50px;
    line-height: 50px;

    &:hover {
        background: whitesmoke;
        color: #0F518D;
    }
}

.topnews {
    margin: 20px;

    .el-card {
        transition: all .2s;

        &:hover {
            transform: translateY(-8px);
        }

        .image {
            height: 200px;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
        }

        .time {
            font-size: 13px;
            color: gray;
        }

        .title {
            width: 100%;
            height: 2.8em;
            white-space: wrap;
            /* 不换行 */
            display: -webkit-box;
            /* 使用弹性盒子布局 */
            -webkit-box-orient: vertical;
            /* 垂直排列 */
            -webkit-line-clamp: 2;
            /* 限制为两行 */
            overflow: hidden;
            /* 隐藏溢出部分 */
            text-overflow: ellipsis
                /* 显示省略号 */
        }
    }
}


.el-card {
    margin: 20px;

    .tabnews {
        display: flex;

        .tabimg {
            width: 180px;
            height: 100px;
            background-size: cover;
            margin-right: 20px;
        }

        .time {
            font-size: 13px;
            color: gray;

        }

        .title {
            margin-bottom: 5px
        }
    }
}
</style>