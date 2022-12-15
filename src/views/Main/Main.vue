<template>
  <div class="main-container">
    <el-container>
      <el-aside width="auto">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <Tags></Tags>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'
import Aside from '@/components/Aside/Aside.vue'
import Tags from '@/components/Tags/Tags.vue'
export default {
  name: 'c-Main',
  components: {
    Aside,
    Header,
    Tags
  }
}
</script>

<style>
html,
body,
h3,
p {
  margin: 0;
  padding: 0;
}
.el-menu {
  border: 0;
}
.el-header {
  background-color: #333;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-aside {
  height: 100vh;
  background-color: #545c64;
}
</style>
