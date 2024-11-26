<script setup>
import { onMounted, ref, reactive } from 'vue';
import axios from 'axios';
const tableData = ref([])
const userForm = reactive({
    username: "",
    password: "",
    role: null, //1 管理 2 编辑
})
const dialogFormVisible = ref(false)
const userFormRef = ref()
const options = [{ label: "管理员", value: 1 }, { label: "编辑", value: 2 }]
const userRules = reactive({
    username: [{ required: true, message: '请修改名字', trigger: 'blur' },],
    password: [{ required: true, message: '请修改密码', trigger: 'blur' },],
    role: [{ required: true, message: '请选择用户权限', trigger: 'blur' },],
})
onMounted(() => {
    getUserList()
})
const getUserList = async () => {
    const res = await axios.get("/adminapi/user/list")
    console.log(res.data);
    if (res.data.ActionType == "OK") {
        tableData.value = res.data.data
    }
}
const handleEdit = async (index, data) => {
    // console.log(index, data);
    const result = await axios.get(`/adminapi/user/list/${data._id}`)
    //返回的是用户对象数组(注意：赋值的时候记得带上_id) 或者直接Object.assign
    // const { username, password, role } = result.data.data[0]
    Object.assign(userForm, result.data.data[0])
    console.log(userForm);
    dialogFormVisible.value = true
}
//编辑确认
const handleEditConfirm = () => {
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            const res = await axios.put(`/adminapi/user/list/${userForm._id}`, userForm)
            if (res.data.ActionType === "OK") {
                ElMessage.success("更新成功")
                getUserList()
                dialogFormVisible.value = false
            }
        }
    })
}
const handleDelete = async (index, data) => {
    console.log(index, data);
    await axios.delete(`/adminapi/user/list/${data._id}`)
    //reload data
    getUserList()
}

</script>
<template>
    <div>
        <el-card>
            <template #header>
                <div class="card-header">
                    <el-page-header content="用户列表" title="用户管理" icon="" />
                </div>
            </template>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="username" label="用户名" />
                <el-table-column label="头像">
                    <template #default="scope">
                        <div v-if="scope.row.avatar">
                            <el-avatar :src="`http://localhost:3000` + scope.row.avatar" />
                        </div>
                        <div v-else>
                            <el-avatar src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="role" label="角色">
                    <template #default="scope">
                        <el-tag type="success" v-if='scope.row.role == 1'>管理员</el-tag>
                        <el-tag type="info" v-else>编辑</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                            修改
                        </el-button>
                        <el-popconfirm title="确定进行删除操作?" confirm-button-text="确定" cancel-button-text="取消"
                            @confirm="handleDelete(scope.$index, scope.row)">
                            <template #reference>
                                <el-button size="small" type="danger">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog v-model="dialogFormVisible" title="编辑用户" width="45%">
            <el-form ref="userFormRef" :model="userForm" :rules="userRules" label-width="auto" class="demo-ruleForm"
                status-icon>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userForm.password" type="password" show-password />
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <el-select v-model="userForm.role" placeholder="--请修改角色--">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消修改</el-button>
                    <el-button type="primary" @click="handleEditConfirm">
                        提交修改
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<style scoped lang="scss">
.el-table {
    margin-top: 40px
}
</style>