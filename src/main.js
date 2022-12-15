import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from '@/router/index.js'
import store from '@/vuex/index.js'
// mock数据拦截
import '@/api/mock.js'

import Router from 'vue-router'

// import Cookies from 'js-cookie'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

Vue.use(ElementUI)

Vue.config.productionTip = false

// 全局导航前置守卫
router.beforeEach((to, from, next) => {
  // const isLogin = Cookies.get('token')
  const isLogin = localStorage.getItem('token')
  if (!isLogin && to.path !== '/login') {
    next('/login')
  } else if (isLogin && to.path === '/login') {
    next('/home')
  } else {
    next()
  }
})

new Vue({
  render: (h) => h(App),
  router,
  store,
  created() {
    store.commit('setMenu', router)
  }
}).$mount('#app')
