<template>
  <el-container>
    <el-aside width="500px">
        <el-image  :src="require('@/assets/image/rear_anchor.png')" align="middle" ></el-image>
    </el-aside>
    <el-container class="right-container">
      <el-main>
        <div>
          <el-row :gutter="20">
            <el-button type="primary" @click="update">最新数据</el-button>
            <el-button type="primary" @click="updateChart">历史数据</el-button>
          </el-row>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column label="日期" prop="datetime"></el-table-column>
            <el-table-column label="测点1" prop="force1"></el-table-column>
            <el-table-column label="测点2" prop="force2"></el-table-column>
            <el-table-column label="测点3" prop="force3"></el-table-column>
            <el-table-column label="测点4" prop="force4"></el-table-column>
            <el-table-column label="测点5" prop="force5"></el-table-column>
            <el-table-column label="测点6" prop="force6"></el-table-column>
          </el-table>
        </div>
      </el-main>
      <el-footer>
        <!--更新按钮-->
        <div class="Echarts">
          <div id="chart" style="width: 800px;height:400px;"></div>
        </div>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Anchor',
  data () {
    return {
      tableData: [],
      chartData: [],
      chartDateTime: []
    }
  },
  methods: {
    async update () {
      const { data: res } = await this.$http.get('anchor/recent?vue=true')
      // console.log(res)
      if (res.map.code !== 200) {
        return this.$message.error('获取最新数据失败！')
      }
      this.tableData = res.map.data
      // console.log(this.tableData)
      this.$message.success('更新最新数据成功！')
    },

    async updateChart () {
      const { data: _xAxis } = await this.$http.get('anchor/10date')
      const { data: _wrappedData } = await this.$http.get('anchor/wrappedData')
      console.log(_xAxis)
      var datetimes = []
      for (var i = 0; i < _xAxis.length; i++) {
        datetimes[i] = _xAxis[i].datetime
      }
      this.chartDateTime = datetimes
      this.chartData = _wrappedData
      // console.log(this.chartDateTime)
      // console.log(this.chartData)
      this.myEcharts()
    },

    myEcharts () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('chart'))
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '历史数据'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['测点1', '测点2', '测点3', '测点4', '测点5', '测点6']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.chartDateTime
        },
        yAxis: {
          type: 'value'
        },
        series: this.chartData
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  },
  mounted () {
    this.update()
    this.updateChart()
  }
}
</script>

<style scoped>
.left-container {
  height: 100%;
  justify-content: center;
  text-align: center;
  position: absolute;
}

.right-container {
  height: 100%;
}

</style>
