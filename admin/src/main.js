import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
//引入Elmessage和Elloading的css样式文件
// import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-message.css';

import Particles from "@tsparticles/vue3";
import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
//import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.
import '@/util/axios.config.js'
// import '@/util/ttt.js'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
// app.use(ElementPlus)
app.use(Particles, {
    init: async engine => {
        await loadFull(engine); // you can load the full tsParticles library from "tsparticles" if you need it
        //await loadSlim(engine); // or you can load the slim version from "tsparticles-slim" if don't need Shapes or Animations
    },
})
app.mount('#app')
