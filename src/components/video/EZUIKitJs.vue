<template>
  <el-container>
    <el-main>
      <div class='hello-ezuikit-js'>
        <div id='video-container'></div>
      </div>
    </el-main>
    <el-footer>
      <el-row>
        <el-button type="primary" icon="el-icon-caret-top" circle @click="control(0)"></el-button>
        <el-button type="primary" icon="el-icon-caret-bottom" circle @click="control(1)"></el-button>
        <el-button type="primary" icon="el-icon-caret-left" circle @click="control(2)"></el-button>
        <el-button type="primary" icon="el-icon-caret-right" circle @click="control(3)"></el-button>
        <el-button type="danger" icon="el-icon-video-pause" circle @click="stop"></el-button>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
import EZUIKit from 'ezuikit-js'
import axios from 'axios'

export default {
  name: 'Side',
  data () {
    return {
      accessTk: ''
    }
  },
  methods: {
    control (direction) {
      console.log(direction)
      axios.post('https://open.ys7.com/api/lapp/device/ptz/start', {
        accessToken: this.accessTk,
        deviceSerial: 'C79361726',
        channelNo: 1,
        speed: 2,
        direction: direction
      })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    stop () {
      console.log('stop...')
      axios.post('https://open.ys7.com/api/lapp/device/ptz/stop', {
        accessToken: this.accessTk,
        deviceSerial: 'C79361726',
        channelNo: 1
      })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    async updateTokenAndPlay () {
      const { data: res } = await this.$http.get('token')
      this.accessTk = res
      var player = new EZUIKit.EZUIKitPlayer({
        autoplay: true,
        id: 'video-container',
        accessToken: this.accessTk,
        url: 'ezopen://open.ys7.com/C79361726/1.live',
        template: 'standard', // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
        width: 800,
        height: 600
      })
      console.log('player', player)
    }
  },
  mounted () {
    console.group('mounted!')
    this.updateTokenAndPlay()
  }

}
</script>
<style>
</style>
