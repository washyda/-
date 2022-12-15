<template>
  <div class="login-container">
    <el-card>
      <el-form :model="loginForm" :inline="true" :rules="loginRules" :label-position="'right'" label-width="70px" ref="logins">
        <h3>后台管理系统登录</h3>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loading">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// import Mock from 'mockjs'
// import Cookies from 'js-cookie'
import { getMenu } from '@/api/index.js'
export default {
  name: 'v-Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '用户名长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    loading() {
      // 表单整体通过验证
      this.$refs.logins.validate((valid) => {
        if (valid) {
          getMenu(this.loginForm).then(({ data }) => {
            if (data.code === 20000) {
              // 保存token到cookie中，属性名为washy
              // Cookies.set('token', data.data.token, { sameSite: 'strict' })
              localStorage.setItem('token', data.data.token)
              // 将菜单数据保存到store中
              this.$store.commit('initMenu', JSON.stringify(data.data.menu))
              // 对menu数据进行缓存
              // Cookies.set('menu', JSON.stringify(data.data.menu))
              localStorage.setItem('menu', JSON.stringify(data.data.menu))
              // 动态拼接路由
              this.$store.commit('setMenu', this.$router)
              this.$router.push('/home')
            } else {
              // 打印错误消息
              this.$message.error(data.data.message)
            }
          })
        }
      })
      // 生成随机token
      // const token = Mock.Random.guid()
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  margin: 300px auto;
  width: 350px;
  border-radius: 15px;
  h3 {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 40px;
  }
  .el-button {
    margin-top: 20px;
    margin-left: 117px;
  }
}
</style>
