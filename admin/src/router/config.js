import UserAdd from '@/views/user-manage/UserAdd.vue'
import UserList from '@/views/user-manage/UserList.vue'
import NewsAdd from '@/views/news-manage/NewsAdd.vue'
import NewsList from '@/views/news-manage/NewsList.vue'
import ProductAdd from '@/views/product-manage/ProductAdd.vue'
import ProductList from '@/views/product-manage/ProductList.vue'
import NotFound from '@/views/notfound/NotFound.vue'
import Homepage from '@/views/home/homepage.vue'
import Center from '@/views/center/Center.vue'
const routes = [
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: Login
    // },
    // {
    //   path: '/mainbox',
    //   name: 'mainbox',
    //   component: MainBox
    // },
    {
      path:"/home",
      component:Homepage
    },
    {
      path:"/center",
      component:Center
    },
    {
      path:"/user-manage/adduser",
      component:UserAdd,
      requireIsAdmin:true //加个字段，表示管理员才行
    },
    {
      path:"/user-manage/userlist",
      component:UserList,
      requireIsAdmin:true //加个字段，表示管理员才行
    },
    {
      path:"/news-manage/addnews",
      component:NewsAdd
    },
    {
      path:"/news-manage/newslist",
      component:NewsList
    },
    {
      path:"/product-manage/addproduct",
      component:ProductAdd,
    },
    {
      path:"/product-manage/productlist",
      component:ProductList,
      requireIsAdmin:true
    },
    {
      path:'/',
      redirect:"/home"
    },
    {
       // 将匹配所有内容并将其放在 `route.params.pathMatch` 下
      path:"/:pathMatch(.*)*",
      name:'NotFound',
      component:NotFound
    }
    //mainbox得嵌套路由，后面根据权限动态添加
  ]
  export default routes