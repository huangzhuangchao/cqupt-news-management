<script setup>
import { useUserInfoStore } from '@/stores/userInfoStore';
import { storeToRefs } from 'pinia';
import { ref, computed, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { upload } from '@/util/upload';
import Upload from '@/components/upload/Upload.vue';
const userInfoStore = useUserInfoStore()
const avatarUrl = computed(() => {
    return userInfoStore.userInfo.avatar ? `http://localhost:3000/` + userInfoStore.userInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})
const userFormRef = ref()
const { username, gender, introduction, avatar } = userInfoStore.userInfo

const userForm = reactive({
    username,
    gender,
    introduction,
    avatar,
    file: null,
})
const userRules = reactive({
    username: [{ required: true, message: '请输入名字', trigger: 'blur' },],
    gender: [{ required: true, message: '请选择性别', trigger: 'blur' },],
    introduction: [{ required: true, message: '请输入个人简介', trigger: 'blur' },],
    avatar: [{ required: true, message: '请上传头像', trigger: 'blur' },],
})
const options = [{ value: 0, label: "保密" }, { value: 1, label: "男" }, { value: 2, label: "女" }]

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
            const res = await upload("/adminapi/user/upload", userForm)
            if (res.ActionType === "OK") {
                // console.log(res.data.data.username);
                userInfoStore.changeUserInfo(res.data)
                ElMessage.success("更新成功")
            }
        }
    })
}

</script>

<template>
    <div>
        <el-page-header icon="">
            <template #content>
                <span> 个人中心 </span>
            </template>
            <template #title>
                <span> 重邮新闻管理发布系统 </span>
            </template>
        </el-page-header>

        <el-row :gutter="20">
            <el-col :span="8">
                <el-card class="box-card">
                    <el-avatar :size="100" :src="avatarUrl" />
                    <h3>{{ userInfoStore.userInfo.username }}</h3>
                    <h5>{{ userInfoStore.userInfo.role == 1 ? "管理员" : "编辑" }}</h5>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span>个人信息</span>
                        </div>
                    </template>
                    <el-form ref="userFormRef" :model="userForm" :rules="userRules" label-width="auto"
                        class="demo-ruleForm" status-icon>
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="userForm.username" />
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-select v-model="userForm.gender" placeholder="请选择性别">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" :disabled="item.disabled" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="个人简介" prop="introduction">
                            <el-input v-model="userForm.introduction" :autosize="{ minRows: 3, maxRows: 3 }"
                                maxlength="70" show-word-limit type="textarea" placeholder="人生处处是风景~" />
                        </el-form-item>
                        <el-form-item label="头像" prop="avatar">
                            <Upload :avatar="userForm.avatar" @file-change="handleChange"></Upload>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm()">
                                更新
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped lang="scss">
.el-row {
    margin-top: 40px;

    .box-card {
        text-align: center
    }
}


</style>