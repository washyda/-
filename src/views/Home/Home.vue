<template>
  <el-row>
    <!-- layout布局 -->
    <el-col :span="8" style="padding-right: 10px">
      <!-- 左侧区域 -->
      <el-card class="box-card">
        <div class="user">
          <img src="@/assets/images/avatar.jpg" />
          <div class="user-info">
            <h3>Admin</h3>
            <p>超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登陆时间:<span>2022-11-05</span></p>
          <p>上次登陆地点:<span>重庆</span></p>
        </div>
      </el-card>
      <el-card class="box-card" style="height: 500px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column v-for="(val, key) in tableLabel" :prop="key" :label="val" :key="key" style="min-width: 350px"></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left: 10px">
      <!-- 右侧区域 -->
      <!-- 统计卡片 -->
      <div class="r-count">
        <el-card class="flexbox" v-for="(item, index) in countData" :key="index" :body-style="{ display: 'flex', padding: 0 }">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
          <div class="r-detail">
            <p class="price">￥ {{ item.value }}</p>
            <p class="countDown">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 数据视图 -->
      <el-card class="main-echarts">
        <div ref="echartsa" style="height: 300px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 295px">
          <div ref="echartsb" style="height: 295px"></div>
        </el-card>
        <el-card style="height: 295px">
          <div ref="echartsc" style="height: 260px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { initData } from '@/api/index.js'
import * as echarts from 'echarts'
export default {
  name: 'v-Home',
  data() {
    return {
      // 商品数据
      tableData: [],
      tableLabel: {
        name: '品牌',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      // 订单数据
      countData: [
        {
          name: '今日支付订单',
          value: '1234',
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日收藏订单',
          value: '210',
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: '1234',
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: '1234',
          icon: 'success',
          color: '#ffb980'
        },
        {
          name: '本月收藏订单',
          value: '1234',
          icon: 'star-on',
          color: '#2ec7c9'
        },
        {
          name: '今日未支付订单',
          value: '1234',
          icon: 's-goods',
          color: '#5ab1ef'
        }
      ]
    }
  },
  mounted() {
    initData().then((data) => {
      // 获取数据并解构重命名
      const { data: res } = data.data.getStatisticalData
      const { tableData, orderData, userData, videoData } = res
      // 为组件初始化值
      this.tableData = tableData
      // 折线图
      const myEcharts1 = echarts.init(this.$refs.echartsa)
      const xAxis = Object.keys(orderData.data[0])
      const series = []
      xAxis.forEach((val) => {
        series.push({
          name: val,
          type: 'line',
          data: orderData.data.map((item) => item[val])
        })
      })
      const option1 = {
        title: {
          text: '日销售额'
        },
        tooltip: {},
        legend: {
          data: xAxis
        },
        xAxis: {
          data: orderData.date
        },
        yAxis: {},
        series
      }
      myEcharts1.setOption(option1)
      // 柱状图
      const myEcharts2 = echarts.init(this.$refs.echartsb)
      const option2 = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: '#333'
          }
        },
        grid: {
          left: '20%'
        },
        // 提示框
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category', // 类目轴
          data: userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: '#17b3a3'
            }
          },
          axisLabel: {
            interval: 0,
            color: '#333'
          }
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            }
          }
        ],
        color: ['#2ec7c9', '#b6a2de'],
        series: [
          {
            name: '新增用户',
            type: 'bar',
            data: userData.map((item) => item.new)
          },
          {
            name: '活跃用户',
            type: 'bar',
            data: userData.map((item) => item.active)
          }
        ]
      }
      myEcharts2.setOption(option2)
      // 饼状图
      const myEcharts3 = echarts.init(this.$refs.echartsc)
      const option3 = {
        tooltip: {
          trigger: 'item'
        },
        color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22', '#39c362', '#3ed1cf'],
        series: [
          {
            type: 'pie',
            data: videoData
          }
        ]
      }
      myEcharts3.setOption(option3)
    })
  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin-bottom: 30px;
}
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 40px;
  border-bottom: 1px solid #666666;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .user-info {
    margin-left: 40px;
    h3 {
      font-size: 32px;
    }
    p {
      font-size: 14px;
      color: #999999;
    }
  }
}
.login-info {
  font-size: 14px;
  p {
    color: #999999;
  }
  span {
    margin-left: 60px;
    color: #666666;
  }
}
.r-count {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .flexbox {
    width: 32%;
    margin-bottom: 20px;
  }
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    line-height: 80px;
    text-align: center;
    color: #fff;
  }
  .r-detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    .price {
      font-weight: 600;
      font-size: 30xp;
      margin-bottom: 5px;
      line-height: 30px;
      height: 30px;
      overflow: hidden;
    }
    .countDown {
      font-size: 14px;
      color: #999999;
      text-align: center;
    }
  }
}
.main-echarts {
  height: 300px;
}
.graph {
  display: flex;
  justify-content: space-between;
  height: 295px;
  margin-top: 20px;
  .el-card {
    width: 49%;
  }
}
</style>
