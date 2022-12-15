<template>
  <div class="goods-container">
    <el-row :gutter="20" v-for="item in goodsData.list" :key = item.index>
      <el-col :span="8" v-for="items in item" :key = items.index>
        <el-card :body-style="{ padding: '15px', width: '100%' }">
          <img src="@/assets/logo.png" class="image" />
          <el-progress :percentage="items.percentage" :color="'#409eff'"></el-progress>
          <div style="padding: 14px">
            <span>{{ items.title }}</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'v-Goods',
  data() {
    return {
      goodsData: {
        code: 200,
        list: {
          row1: [
            {
              image: '/logo.png',
              title: '小米',
              percentage: 20
            },
            {
              image: '/logo.png',
              title: '苹果',
              percentage: 25
            },
            {
              image: '/logo.png',
              title: '三星',
              percentage: 25
            }
          ],
          row2: [
            {
              image: '/logo.png',
              title: 'OPPO',
              percentage: 25
            },
            {
              image: '/logo.png',
              title: 'ViVo',
              percentage: 25
            },
            {
              image: '/logo.png',
              title: '魅族',
              percentage: 25
            }
          ]
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 60%;
  margin-left: 20%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
.el-card {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
