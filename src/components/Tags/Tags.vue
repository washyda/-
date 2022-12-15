<template>
  <div class="container-tags">
    <el-tag v-for="tag in $store.state.tabList" :key="tag.name" :closable="tag.name !== 'home'" :effect="$route.path === tag.path || (tag.path === '/' && $route.path === '/home') ? 'dark' : 'plain'" @close="removeTag(tag)" @click="gotoMenu(tag)" style="margin: 0 15px 10px 0">
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
export default {
  name: 'c-Tags',
  methods: {
    gotoMenu(item) {
      this.$router.push(item.path)
    },
    removeTag(tag) {
      const index = this.$store.state.tabList.findIndex((item) => item.name === tag.name)
      if (index !== -1) {
        if (this.$route.path === this.$store.state.tabList[index].path) {
          this.$store.state.tabList.splice(index, 1)
          this.gotoMenu(this.$store.state.tabList[this.$store.state.tabList.length - 1])
        } else {
          this.$store.state.tabList.splice(index, 1)
          return true
        }
      }
    }
  }
}
</script>

<style></style>
