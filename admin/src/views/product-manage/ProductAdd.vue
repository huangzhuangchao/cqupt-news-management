<script setup>
import { ref, reactive } from 'vue';
import Editor from '@/components/editor/Editor.vue';
import Upload from '@/components/upload/Upload.vue';
import { upload } from '@/util/upload';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
const router = useRouter()
const productForm = reactive({
    title: "",
    introduction: "",
    detail:"",
    cover: "",
    file: null, //提交后端的二进制对象
})
const productFormRef = ref()

const productRules = reactive({
    title: [{ required: true, message: '请输入物品名称', trigger: 'blur' },],
    introduction: [{ required: true, message: '请输入物品简要描述', trigger: 'blur' }],
    detail: [{ required: true, message: '请输入物品详细描述', trigger: 'blur' }],
    cover: [{ required: true, message: '请输入物品封面', trigger: 'blur' }],
})


//每次选择完图片之后的回调
const handleChange = (file) => {
    console.log(file);
    productForm.cover = URL.createObjectURL(file)
    productForm.file = file
    console.log(productForm.cover);

}
const submitForm = () => {
    productFormRef.value.validate(async (valid) => {
        if (valid) {
            console.log(productForm);
            const res = await upload("/adminapi/product/add", productForm)
            console.log(res);

            router.push('/product-manage/productlist')
            ElMessage({
                message: '创建成功',
                type: 'success',
            })
        }
    })
}
</script>
<template>
    <el-page-header icon="" title="校园周边" content="添加物品" />
    <el-form ref="productFormRef" :model="productForm" :rules="productRules" label-width="auto" class="demo-ruleForm"
        status-icon>
        <el-form-item label="物品名称" prop="title">
            <el-input v-model="productForm.title" />
        </el-form-item>
        <el-form-item label="物品简要描述" prop="introduction">
            <el-input v-model="productForm.introduction" :autosize="{ minRows: 3, maxRows: 3 }" 
                show-word-limit type="textarea" placeholder="神秘物品~" />
        </el-form-item>
        <el-form-item label="物品详细描述" prop="detail">
            <el-input v-model="productForm.detail" :autosize="{ minRows: 3, maxRows: 3 }" 
                show-word-limit type="textarea" placeholder="神秘~" />
        </el-form-item>
        <el-form-item label="物品封面" prop="cover">
            <Upload :avatar="productForm.cover" @file-change="handleChange"></Upload>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm()">添加物品</el-button>
        </el-form-item>
    </el-form>
</template>
<style scoped lang="scss">
.el-form {
    margin-top: 40px;
}
</style>