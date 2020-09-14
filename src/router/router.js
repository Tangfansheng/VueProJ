import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import Users from '@/components/user/Users'
import Anchor from '@/components/data/Anchor'
import Derrick from '@/components/data/Derrick'
import Stress from '@/components/data/Stress'
import Basket from '@/components/data/Basket'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
        { path: '/anchor', component: Anchor },
        { path: '/derrick', component: Derrick },
        { path: '/stress', component: Stress },
        { path: '/putdown', component: Basket }
      ]
    }
  ]
})

// 挂载路由导航守卫 如果没有token强制到登录页  这种实现方式问题很大！如果token过期了咋办
// 正确的方式应该是由后端的redis去判断token是否有效 filter实现 后期会加入
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
