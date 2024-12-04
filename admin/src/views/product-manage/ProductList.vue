<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';
import formatTime from '@/util/formatTime';
import { Edit, Delete} from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const tableData = ref([])

onMounted(() => {
    getNewsList()
})

const getNewsList = async () => {
    const res = await axios.get("/adminapi/product/list")
    // console.log(res.data);
    tableData.value = res.data.data
    // console.log(tableData.value);
}

//点击删除操作
const handleDelete = async (item)=>{
    console.log(item);
    const res = await axios.delete(`/adminapi/product/list/${item._id}`)
    // console.log(res.data);
    
    await getNewsList()
}
//编辑回调
const handleEdit = (item)=>{
    //跳转到/news-manage/editnews/:id
    router.push(`/product-manage/editproduct/${item._id}`)
}
</script>
<template>
    <div>
        <el-card>
            <template #header>
                <div class="card-header">
                    <el-page-header content="物品列表" title="校园周边" icon="" />
                </div>
            </template>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="title" label="物品名称" />
                <el-table-column prop="introduction" label="简要描述"></el-table-column>

                <el-table-column prop="editTime" label="更新时间">
                    <template #default="scope">
                        {{ formatTime.getTime(scope.row.editTime) }}
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button :icon="Edit" circle @click="handleEdit(scope.row)"/>
                        <el-popconfirm title="确定删除该物品吗?" confirm-button-text="确定" cancel-button-text="取消" @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button :icon="Delete" type="danger" circle />
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>

            </el-table>
        </el-card>
    </div>
</template>
<style lang="scss" , scoped>
.el-table {
    margin-top: 40px;
}
</style>