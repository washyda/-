<template>
  <div class="header-container">
    <!-- 左边按钮 -->
    <div class="l-btn">
      <el-button icon="el-icon-menu" size="mini" @click="collapse"></el-button>
      <!-- 面包屑区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in $store.state.tabList" :key="item.name" :to={path:item.path}>{{ item.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 用户信息 -->
    <div class="r-user">
      <el-dropdown @command="handleCommand">
        <img src="@/assets/images/avatar.jpg" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="layout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
// import Cookie from 'js-cookie'
export default {
  name: 'c-Header',
  methods: {
    collapse() {
      this.$store.commit('collapse')
    },
    handleCommand(command) {
      if (command === 'layout') {
        // 清除cookie
        // Cookie.remove('washy')
        localStorage.removeItem('token')
        // 清除menu
        // Cookie.remove('menu')
        localStorage.removeItem('menu')
        this.$router.push('/login')
      } else {
        alert('用户中心搭建中')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header-container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .l-btn {
    display: flex;
    align-items: center;
    /deep/ .el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-weight: 400;
        cursor: pointer;
        &.is-link {
          color: #999;
        }
      }
      &:first-child {
        padding-left: 10px;
      }
      &:last-child {
        .el-breadcrumb__inner {
          color: #fff !important;
        }
      }
    }
  }
  .r-user {
    img {
      width: 40px;
      border-radius: 50%;
    }
  }
}
</style>
