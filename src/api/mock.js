import Mock from 'mockjs'
import homeApi from '@/api/mockServeData/home.js'
import user from '@/api/mockServeData/user.js'
import permission from '@/api/mockServeData/permission.js'
// 首页数据
Mock.mock('/api/home', homeApi)
// 用户数据
Mock.mock(/\/api\/user\/getUser/, user.getUserList)
Mock.mock('/api/user/addUser', 'post', user.createUser)
Mock.mock('/api/user/editUser', 'post', user.updateUser)
Mock.mock('/api/user/removeUser', 'post', user.deleteUser)
// 菜单分级
Mock.mock(/\/api\/getMenu/, 'post', permission.getMenu)
