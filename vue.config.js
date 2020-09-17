module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/VueProJ/" : "/",
  chainWebpack: config => {
    //图片优化
    config.module.rule('image')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({ bypassOnDebug: true })
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')
      //使用externals设置排除项
      config.set('externals',{
        axios:'axios',
        echarts:'echarts'
      })
    })

    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main.js')
    })
  }
}
