<script setup>
import { ref, reactive } from 'vue';
import Upload from '@/components/upload/Upload.vue';
import { upload } from '@/util/upload';
import { useRouter } from 'vue-router';
const router = useRouter()
const userForm = reactive({
    username: "",
    password: "",
    introduction: "",
    avatar: null,
    role: null, //1 管理 2 编辑
    file: null,
    gender:0
})
const userRules = reactive({
    username: [{ required: true, message: '请输入名字', trigger: 'blur' },],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' },],
    role: [{ required: true, message: '请输入选择用户权限', trigger: 'blur' },],
    introduction: [{ required: true, message: '请输入个人简介', trigger: 'blur' },],
    avatar: [{ required: true, message: '请上传头像', trigger: 'blur' },],
})
const options = [{ value: 1, label: "管理员" }, { value: 2, label: "编辑" }]
const userFormRef = ref()
//每次选择完图片之后的回调
const handleChange = (file) => {
    console.log(file);
    userForm.avatar = URL.createObjectURL(file)
    userForm.file = file
    console.log(userForm.avatar);

}
//提交更新
const submitForm = () => {
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            console.log("submit", userForm);
            const res = await upload("/adminapi/user/add", userForm)
            if (res.ActionType === "OK") {
                // console.log(res.data.data.username);
                // userInfoStore.changeUserInfo(res.data)
                ElMessage.success("添加成功")
                // router.push("/user-manage/userlist")
            }
        }
    })
}

</script>
<template>
    <div>
        <el-page-header icon="" title="用户管理" content="添加用户" />

        <el-form ref="userFormRef" :model="userForm" :rules="userRules" label-width="auto" class="demo-ruleForm"
            status-icon>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="userForm.password" type="password" show-password />
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <el-select v-model="userForm.role" placeholder="--请选择角色--">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="个人简介" prop="introduction">
                <el-input v-model="userForm.introduction" :autosize="{ minRows: 3, maxRows: 3 }" maxlength="70"
                    show-word-limit type="textarea" placeholder="神秘人士~" />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
                <Upload :avatar="userForm.avatar" @file-change="handleChange"></Upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">
                    添加用户
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style scoped lang="scss">
.demo-ruleForm {
    margin-top: 40px;
}
</style>