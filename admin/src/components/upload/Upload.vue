<script setup>
import { Plus } from '@element-plus/icons-vue';
//封装上传组件
const props = defineProps({
    avatar: String
})
const emits = defineEmits(["fileChange"])

//用于上传头像后，显示头像
const uploadAvatar = computed(() => {
    return props.avatar.includes("blob") ? props.avatar : `http://localhost:3000/` + props.avatar
})
const handleChange = (file) =>{
    emits("fileChange", file.raw)
}
</script>

<template>
    <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false" :auto-upload="false" :on-change="handleChange">
        <img v-if="props.avatar" :src="uploadAvatar" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
</template>
<style scoped lang="scss">
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.avatar-uploader :deep(.el-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader :deep(.el-upload:hover) {
    border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-uploader-icon) {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

</style> 

