import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import News from '@/views/News.vue'
import Product from '@/views/Product.vue'
import 'nprogress/nprogress.css'
import nprogress from 'nprogress'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/news',
      name: 'news',
      component: News
    },
    {
      path: '/product',
      name: 'product',
      component: Product
    },
  ]
})

router.beforeEach((to, form, next)=>{
  nprogress.start();
  next()
})
router.afterEach(()=>{
  nprogress.done()
})
export default router
