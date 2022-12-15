import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main/Main.vue'
import Login from '@/views/Login/Login.vue'
// import Home from '@/views/Home/Home.vue'
// import User from '@/views/User/User.vue'
// import Goods from '@/views/Goods/Goods.vue'
// import Pageone from '@/views/PageOne/PageOne.vue'
// import Pagetwo from '@/views/PageTwo/PageTwo.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: '/home',
    children: [
      // { path: 'home', name: 'home', component: Home },
      // { path: 'user', name: 'user', component: User },
      // { path: 'goods', name: 'goods', component: Goods },
      // { path: 'page1', name: 'page1', component: Pageone },
      // { path: 'page2', name: 'page2', component: Pagetwo }
    ]
  },
  { path: '/login', component: Login }
]
const router = new VueRouter({
  routes
})

// 解决退出重新登陆后出现重复路由提示
export function resetRouter() {
  const newRouter = new VueRouter({
    routes
  })
  router.matcher = newRouter.matcher // the relevant part
}
export default router
