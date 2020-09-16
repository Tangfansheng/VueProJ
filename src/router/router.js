import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import Users from '@/components/user/Users'
import Anchor from '@/components/data/Anchor'
import Derrick from '@/components/data/Derrick'
import Stress from '@/components/data/Stress'
import Basket from '@/components/sync/Basket'
import Bottom from '@/components/video/Bottom'
import Overall from '@/components/video/Overall'
import Side from '@/components/video/Side'
import Environment from '@/components/env/Environment'
import WalkSync from '@/components/sync/WalkSync'
import Error from '@/components/error/404'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: '/VueProJ/',
  routes: [
    { path: '*', component: Error },
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
        { path: '/putdown', component: Basket },
        { path: '/overall', component: Overall },
        { path: '/side', component: Side },
        { path: '/bottom', component: Bottom },
        { path: '/env', component: Environment },
        { path: '/walkSync', component: WalkSync }
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
