<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import logo from '@/assets/images/logo.png'
import { ElMessage } from 'element-plus'
import { useUserInfoStore } from '@/stores/userInfoStore';
const userInfoStore = useUserInfoStore()
//配置particles粒子特效
const options = {
    background: {
        color: {
            value: '#2d3a4b'
        }
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: 'push'
            },
            onHover: {
                enable: true,
                mode: 'repulse'
            },
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40
            },
            push: {
                quantity: 4
            },
            repulse: {
                distance: 200,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: '#ffffff'
        },
        links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
        },
        move: {
            direction: 'none',
            enable: true,
            outModes: 'bounce',
            random: false,
            speed: 6,
            straight: false
        },
        number: {
            density: {
                enable: true,
            },
            value: 80
        },
        opacity: {
            value: 0.5
        },
        shape: {
            type: 'circle'
        },
        size: {
            value: { min: 1, max: 5 }
        }
    },
    detectRetina: true
}

const loginForm = reactive({
    username: '',
    password: ''
}) // 表单绑定的响应式对象
const loginFormRef = ref() // 表单的引用对象

const loginRules = reactive({
    username: [
        { required: true, message: '请输入用户名！', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码！', trigger: 'blur' },
    ],
})
const router = useRouter()
const submitForm = () => {
    // 1.校验表单,手动触发校验方法
    loginFormRef.value.validate((valid, fields) => {
        if (valid) {
            console.log('submit!', loginForm)
            //设置token
            // localStorage.setItem("token", "sonian")
            axios.post("/adminapi/user/login", loginForm).then(res =>{
               console.log(res.data );

                if(res.data.ActionType == "OK"){
                    console.log(res.data.data, 666);
                    //将用户信息放到pinia
                    userInfoStore.changeUserInfo(res.data.data)
                    router.push("/home")
                }else{
                    ElMessage.error('用户名或密码错误！')
                }
            })
        } else { 
            console.log('error submit!', fields)
        }
    })

}

</script>

<template>
    <div>
        <vue-particles id="tsparticles" :options="options" />
        <div class="formContainer">
            <img :src="logo" alt="重邮">
            <h3>重邮新闻管理发布系统</h3>
            <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="loginRules" label-width="auto"
                class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()">
                        登录
                    </el-button>
                    <!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style scoped lang="scss">
.formContainer {
    width: 500px;
    height: 300px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba($color: #000000, $alpha: 0.5);
    color: white;
    text-align: center;
    padding: 30px;
   
    .el-form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    img{
        width: 200px;
    }
    .el-input{
        width: 240px;
    }
}

:deep(.el-form-item__label) {
    color: white;
}

h3 {
    font-size: 30px;
    margin-bottom: 20px;
}
</style>
