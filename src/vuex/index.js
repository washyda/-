// import Cookie from 'js-cookie'
import Vue from 'vue'
import Vuex from 'vuex'
import { resetRouter } from '@/router'

Vue.use(Vuex)

const vuex = new Vuex.Store({
  actions: {},
  mutations: {
    collapse(context) {
      context.isCollapse = !context.isCollapse
    },
    addTabList(context, item) {
      if (item.path === '/home') {
        return true
      }
      const flag = context.tabList.findIndex((val) => val.name === item.name)
      if (flag === -1) {
        context.tabList.push(item)
      }
    },
    initMenu(context, val) {
      context.menuData = val
    },
    setMenu(context, router) {
      if (!localStorage.getItem('menu')) {
        return false
      }
      const menu = JSON.parse(localStorage.getItem('menu'))
      context.menuData = menu
      const menuArray = []
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`@/views/${item.url}`)
            return item
          })
          menuArray.push(...item.children)
        } else {
          item.component = () => import(`@/views/${item.url}`)
          menuArray.push(item)
        }
      })
      resetRouter()
      menuArray.forEach(item => {
        router.addRoute('Main', item)
      })
    }
  },
  state: {
    // 侧边栏是否折叠
    isCollapse: false,
    // 面包屑数据
    tabList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'Home/Home'
      }
    ],
    // menu数据
    menuData: []
  }
})
export default vuex
