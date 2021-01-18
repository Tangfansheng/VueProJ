<template>
  <div class='hello-ezuikit-js'>
    <div id='video-container' style='width:1000px;height:600px'></div>
  </div>
</template>

<script>
import EZUIKit from 'ezuikit-js'

export default {
  name: 'Overall',
  data () {
    return {
      accessTk: ''
    }
  },
  methods: {
    async updateTokenAndPlay () {
      const { data: res } = await this.$http.get('token')
      this.accessTk = res
      var player = new EZUIKit.EZUIKitPlayer({
        autoplay: true,
        id: 'video-container',
        accessToken: this.accessTk,
        url: 'ezopen://open.ys7.com/E82153087/1.live',
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
