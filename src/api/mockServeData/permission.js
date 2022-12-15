import Mock from 'mockjs'
export default {
  getMenu: (config) => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === '123456') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'Home/Home.vue'
            },
            {
              path: '/goods',
              name: 'goods',
              label: '商品管理',
              icon: 's-goods',
              url: 'Goods/Goods.vue'
            },
            {
              path: '/user',
              name: 'user',
              label: '用户管理',
              icon: 'user-solid',
              url: 'User/User.vue'
            },
            {
              label: '其他',
              icon: 'location',
              children: [
                {
                  path: '/page1',
                  name: 'page1',
                  label: '页面一',
                  icon: 'setting',
                  url: 'PageOne/PageOne.vue'
                },
                {
                  path: '/page2',
                  name: 'page2',
                  label: '页面二',
                  icon: 'setting',
                  url: 'PageTwo/PageTwo.vue'
                }
              ]
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'washy' && password === '123456') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'Home/Home.vue'
            },
            {
              path: '/goods',
              name: 'goods',
              label: '商品管理',
              icon: 's-goods',
              url: 'Goods/Goods.vue'
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }
  }
}
