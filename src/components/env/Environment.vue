<template>
  <div>
    <el-row :gutter="20">
      <el-button type="primary" @click="update">刷新</el-button>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column label="日期" prop="datetime"></el-table-column>
      <el-table-column label="温度" prop="tem"></el-table-column>
      <el-table-column label="湿度" prop="hum"></el-table-column>
      <el-table-column label="风力" prop="wind"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Environment',
  data () {
    return {
      message: 'environment',
      tableData: []
    }
  },
  methods: {
    async update () {
      const { data: res } = await this.$http.get('env')
      this.tableData = res
      this.$message.success('更新最新数据成功！')
    }
  },
  mounted () {
    this.update()
  }
}
</script>

<style scoped>

</style>
