import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Users from '@/components/user/Users'
import Anchor from '@/components/data/Anchor'
import Derrick from '@/components/data/Derrick'
import Stress from '@/components/data/Stress'
import Basket from '@/components/sync/Basket'
import Bottom1 from '@/components/video/video1'
import Bottom2 from '@/components/video/video3'
import Side1 from '@/components/video/video2'
import Side2 from '@/components/video/video4'
import Ball from '@/components/video/video'
import Environment from '@/components/env/Environment'
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
      redirect: '/derrick',
      children: [
        { path: '/users', component: Users },
        { path: '/anchor', component: Anchor },
        { path: '/derrick', component: Derrick },
        { path: '/stress', component: Stress },
        { path: '/putdown', component: Basket },
        { path: '/bottom1', component: Bottom1 },
        { path: '/bottom2', component: Bottom2 },
        { path: '/side1', component: Side1 },
        { path: '/side2', component: Side2 },
        { path: '/overall', component: Ball },
        { path: '/side2', component: Side2 },
        { path: '/env', component: Environment }
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
