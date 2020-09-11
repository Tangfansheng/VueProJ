import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import './plugin/element'
import './assets/css/ global.css'
import './assets/icon/iconfont.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios
// 请求的基准路径
axios.defaults.baseURL = 'http://127.0.0.1:8081/'
axios.interceptors.request.use(config => {
  // 挂载请求头token
  config.headers.Authorization = window.sessionStorage.getItem('token')
  console.log(config)
  return config
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
