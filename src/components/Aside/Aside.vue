<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <!-- 侧边栏标题 -->
    <h3>{{ isCollapse === false ? '后台管理系统' : '后台' }}</h3>
    <!-- 侧边栏选项 -->
    <el-menu-item v-for="item in noChildren" :key="item.name" :index="item.name" @click="gotoMenu(item)">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.name">
        <el-menu-item :index="subItem.name" @click="gotoMenu(subItem)">{{ subItem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
// import Cookie from 'js-cookie'
export default {
  name: 'c-Aside',
  data() {
    return {
      // menu: [
      //   {
      //     path: '/',
      //     name: 'home',
      //     label: '首页',
      //     icon: 's-home',
      //     url: 'Home/Home'
      //   },
      //   {
      //     path: '/goods',
      //     name: 'goods',
      //     label: '商品管理',
      //     icon: 's-goods',
      //     url: 'GoodsManage/GoodsManage'
      //   },
      //   {
      //     path: '/user',
      //     name: 'user',
      //     label: '用户管理',
      //     icon: 'user-solid',
      //     url: 'UserManage/UserManage'
      //   },
      //   {
      //     label: '其他',
      //     icon: 'location',
      //     children: [
      //       {
      //         path: '/page1',
      //         name: 'page1',
      //         label: '页面一',
      //         icon: 'setting',
      //         url: 'Other/PageOne'
      //       },
      //       {
      //         path: '/page2',
      //         name: 'page2',
      //         label: '页面二',
      //         icon: 'setting',
      //         url: 'Other/PageTwo'
      //       }
      //     ]
      //   }
      // ]
    }
  },
  computed: {
    noChildren() {
      return this.menuData.filter((item) => !item.children)
    },
    hasChildren() {
      return this.menuData.filter((item) => item.children)
    },
    isCollapse() {
      return this.$store.state.isCollapse
    },
    menuData() {
      // return JSON.parse(Cookie.get('menu')) || JSON.parse(this.$store.state.menuData)
      return JSON.parse(localStorage.getItem('menu')) || JSON.parse(this.$store.state.menuData)
    }
  },
  methods: {
    handleOpen() {},
    handleClose() {},
    // 路由组件跳转
    gotoMenu(item) {
      if (item.path === this.$route.path || (this.$route.path === '/home' && item.path === '/')) {
        return true
      }
      this.$router.push(item.path)
      this.$store.commit('addTabList', item)
    }
  }
}
</script>

<style lang="less" scoped>
h3 {
  padding: 20px 0;
  color: #fff;
  text-align: center;
}
</style>
