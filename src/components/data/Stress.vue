<template>
  <el-container>
    <el-aside width="500px">
      <span class="demonstration"></span>
      <el-image :src="require('@/assets/image/main_truss.png')" align="center"></el-image>
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
            <el-table-column label="上平杆" prop="upper"></el-table-column>
            <el-table-column label="前斜杆" prop="front"></el-table-column>
            <el-table-column label="立柱" prop="mid"></el-table-column>
            <el-table-column label="后拉杆" prop="rear"></el-table-column>
            <el-table-column label="下平杆" prop="bottom"></el-table-column>
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
  name: 'Stress',
  data () {
    return {
      tableData: [],
      chartData: [],
      chartDateTime: []
    }
  },
  methods: {
    async update () {
      const { data: res } = await this.$http.get('stress/recent?vue=true')
      this.tableData = res
      this.$message.success('更新最新数据成功！')
    },

    async updateChart () {
      const { data: _xAxis } = await this.$http.get('stress/10date')
      const { data: _wrappedData } = await this.$http.get('stress/wrappedData')
      var datetimes = []
      for (var i = 0; i < _xAxis.length; i++) {
        datetimes[i] = _xAxis[i].datetime
      }
      this.chartDateTime = datetimes
      this.chartData = _wrappedData
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
          data: ['上平杆', '前斜杆', '立柱', '后拉杆', '下平杆']
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
