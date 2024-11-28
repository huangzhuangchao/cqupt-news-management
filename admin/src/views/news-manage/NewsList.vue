<script setup>
    import { ref, reactive } from 'vue';
    const tableData = ref([])
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
               
                
            </el-table>
        </el-card>
    </div>
</template>