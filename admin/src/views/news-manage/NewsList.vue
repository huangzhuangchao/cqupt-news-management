<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';
import formatTime from '@/util/formatTime';
import { Edit, Delete, Star, SwitchFilled } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const tableData = ref([])
//用于预览的对象
const prewiveData = ref({})
onMounted(() => {
    getNewsList()
})
const dialogTableVisible = ref(false)
const getNewsList = async () => {
    const res = await axios.get("/adminapi/news/list")
    tableData.value = res.data.data
    // console.log(tableData.value);
}
//格式化分类信息
const categoryArr = ["最新动态", "典型案例", "通知公告"]
const categoryFormat = (category) => {
    return categoryArr[category - 1]
}
//格式化时间信息(封装成公共函数，util中)
// const editTimeFormat = (editTime) =>{
//     return editTime
// }
const handleSwitchChange = async (item) => {
    // console.log(item);
    await axios.put("/adminapi/news/publish", { _id: item._id, isPublish: item.isPublish })
    await getNewsList()
}
//预览的回调
const handlePreview = (item) => {
    prewiveData.value = item
    dialogTableVisible.value = true

}
//点击删除操作
const handleDelete = async (item)=>{
    console.log(item);
    const res = await axios.delete(`/adminapi/news/list/${item._id}`)
    // console.log(res.data);
    
    await getNewsList()
}
//编辑回调
const handleEdit = (item)=>{
    //跳转到/news-manage/editnews/:id
    router.push(`/news-manage/editnews/${item._id}`)
}
</script>
<template>
    <div>
        <el-card>
            <template #header>
                <div class="card-header">
                    <el-page-header content="新闻列表" title="新闻管理" icon="" />
                </div>
            </template>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="title" label="标题" />
                <el-table-column prop="category" label="分类">
                    <template #default="scope">
                        <!-- 1 最新动态 2 典型案例 3 通知公告 -->
                        {{ categoryFormat(scope.row.category) }}
                    </template>
                </el-table-column>
                <el-table-column prop="editTime" label="更新时间">
                    <template #default="scope">
                        {{ formatTime.getTime(scope.row.editTime) }}
                    </template>
                </el-table-column>
                <el-table-column prop="isPublish" label="是否发布">
                    <template #default="scope">
                        <el-switch v-model="scope.row.isPublish" :active-value=1 :inactive-value=0
                            @change="handleSwitchChange(scope.row)" />
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-tooltip content="内容预览" placement="left" effect="light">
                            <el-button :icon="Star" type="success" circle @click="handlePreview(scope.row)" />
                        </el-tooltip>
                        <el-button :icon="Edit" circle @click="handleEdit(scope.row)"/>
                        <el-popconfirm title="确定删除该新闻吗?" confirm-button-text="确定" cancel-button-text="取消" @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button :icon="Delete" type="danger" circle />
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
    <el-dialog v-model="dialogTableVisible" title="预览新闻" width="50%">
        <h2>{{ prewiveData.title }}</h2>
        <div>{{ formatTime.getTime(prewiveData.editTime) }}</div>
        <el-divider border-style="dashed">
            <el-icon>
                <SwitchFilled />
            </el-icon>
        </el-divider>
        <div v-html="prewiveData.content"></div>
    </el-dialog>
</template>
<style lang="scss" , scoped>
.el-table {
    margin-top: 40px;
}
</style>