<script setup>
import { ref, reactive } from 'vue';
import Editor from '@/components/editor/Editor.vue';
import Upload from '@/components/upload/Upload.vue';
import { upload } from '@/util/upload';
import { useRouter } from 'vue-router';
const router = useRouter()
const newsForm = reactive({
    title: "",
    content: "",
    category: null, //1 最新动态 2 典型案例 3 通知公告
    cover: "",
    file: null, //提交后端的二进制对象
    isPublish: 0, //0 已发布 1 未发布
})
const options = [{ label: "最新动态", value: 1 }, { label: "典型案例", value: 2 }, { label: "通知公告", value: 3 }]
const newsFormRef = ref()

const newsRules = reactive({
    title: [{ required: true, message: '请输入名字', trigger: 'blur' },],
    content: [{ required: true, message: '请输入内容', trigger: 'blur',
        validator: (rule, value, callback) => {
            // 清理内容，移除空白字符和默认生成的<p><br></p>
            const cleanedContent = value.replace(/<p><br><\/p>/gi, '').trim();
            // 判断清理后的内容是否为空
            if (cleanedContent === '') {
            callback(new Error('请输入内容'));
            } else {
            callback();
            }
        }
     },],
    category: [{ required: true, message: '请输入分类', trigger: 'blur' }],
    cover: [{ required: true, message: '请输入封面', trigger: 'blur' }],
})

const editHandler = (data) => {
    // console.log(data);
    newsForm.content = data //这里存的是对象数组。视频里面是html
}
//每次选择完图片之后的回调
const handleChange = (file) => {
    console.log(file);
    newsForm.cover = URL.createObjectURL(file)
    newsForm.file = file
    console.log(newsForm.cover);

}
const submitForm = () =>{
    newsFormRef.value.validate(async (valid) =>{
        if(valid){
            console.log(newsForm);
            const res = await upload("/adminapi/news/add", newsForm)
            console.log(res);
            
            // router.push('/news-manage/newslist')
        }
    })
}
</script>
<template>
    <el-page-header icon="" title="新闻管理" content="创建新闻" />
    <el-form ref="newsFormRef" :model="newsForm" :rules="newsRules" label-width="auto" class="demo-ruleForm"
        status-icon>
        <el-form-item label="标题" prop="title">
            <el-input v-model="newsForm.title" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
            <!-- <el-input v-model="newsForm.content" type="password" show-password /> -->
            <Editor @event="editHandler"></Editor>
        </el-form-item>
        <el-form-item label="类别" prop="category">
            <el-select v-model="newsForm.category" placeholder="--请选择类别--">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="封面" prop="cover">
            <Upload :avatar="newsForm.cover" @file-change="handleChange"></Upload>
        </el-form-item>
        <el-form-item>
           <el-button type="primary" @click="submitForm()">创建新闻</el-button>
        </el-form-item>
    </el-form>
</template>
<style scoped lang="scss">
.el-form {
    margin-top: 40px;
}
</style>