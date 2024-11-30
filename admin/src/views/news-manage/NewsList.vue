<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';
import formatTime from '@/util/formatTime';
import { Edit, Delete, Star } from '@element-plus/icons-vue';
const tableData = ref([])
onMounted(() => {
    getNewsList()
    
})
const getNewsList = async () => {
    const res = await axios.get("/adminapi/news/list")
    tableData.value = res.data.data
    console.log(tableData.value);
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
const handleSwitchChange = async (item)=>{
    // console.log(item);
    await axios.put("/adminapi/news/publish", {_id:item._id, isPublish:item.isPublish})
    getNewsList()
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
                <el-table-column prop="category" label="分类" >
                    <template #default="scope">
                        <!-- 1 最新动态 2 典型案例 3 通知公告 -->
                        {{ categoryFormat(scope.row.category) }}
                    </template>
                </el-table-column>
                <el-table-column prop="editTime" label="更新时间" >
                    <template #default="scope">
                        {{ formatTime.getTime(scope.row.editTime) }}
                    </template>
                </el-table-column>
                <el-table-column prop="isPublish" label="是否发布" >
                    <template #default="scope">
                        <el-switch v-model="scope.row.isPublish"  
                        :active-value=1
                        :inactive-value=0
                        @change="handleSwitchChange(scope.row)"
                        />
                    </template>
                </el-table-column>
                <el-table-column label="操作" >
                    <template #default="scope">
                        <el-button :icon="Star" type="success" circle/>
                        <el-button :icon="Edit" circle/>
                        <el-button :icon="Delete" type="danger" circle/>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<style lang="scss", scoped>
    .el-table{
        margin-top: 40px;
    }
</style>