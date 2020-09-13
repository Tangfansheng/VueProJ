<template>

  <el-container class="home-container">
    <!--  头部  -->
    <el-header>
      <div>
        <img src="" alt="">
        <span>XTBridge后台监控平台</span>
      </div>
      <el-button type="info" @click="logout">logout</el-button>
    </el-header>
    <!--  页面主体  -->
    <el-container>
      <!--   侧边栏  -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区-->
        <el-menu
          background-color="#333744"
          router
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened='true'
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="activePath">
          <!-- 一级菜单-->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id" >
            <!--一级菜单的模板区域-->
            <template slot="title">
              <!-- 图标 后面想加再说-->
<!--              <i class="el-icon-location"></i>-->
              <!-- 文本-->
              <span>{{ item.name }}</span>
            </template>
            <!--二级菜单-->
            <el-menu-item :index="subItem.path"
                          v-for="subItem in item.children"
                          :key="subItem.id"
                          @click="saveNavState(subItem.path)">
              <template slot="title">
                <!-- 图标-->
                <i class="el-icon-menu"></i>
                <!-- 文本-->
                <span>{{ subItem.name }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--  右侧内容主体-->
      <el-main>
        <!--路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      menulist: [
        {
          id: 1,
          name: '力监控',
          children: [
            {
              id: 1,
              name: '前吊杆力监控',
              path: '/derrick',
              children: []
            },
            {
              id: 2,
              name: '后锚杆力监控',
              path: '/anchor',
              children: []
            }
          ]
        },
        {
          id: 2,
          name: '应力监控',
          children: [{
            id: 1,
            name: '桁架应力监控',
            path: '/stress',
            children: []
          }]
        },
        {
          id: 3,
          name: '视频监控',
          children: [
            {
              id: 1,
              name: '挂篮全局监控',
              path: '/overall',
              children: []
            },
            {
              id: 2,
              name: '挂篮侧模监控',
              path: '/side',
              children: []
            },
            {
              id: 3,
              name: '挂篮底篮监控',
              path: '/bottom',
              children: []
            }]
        },
        {
          id: 4,
          name: '同步监控',
          children: [
            {
              id: 1,
              name: '挂篮下放力监测',
              path: '/putDown',
              children: []
            },
            {
              id: 2,
              name: '挂篮行走同步监控',
              path: '/walkSync',
              children: []
            }
          ]
        },
        {
          id: 5,
          name: '施工环境监控',
          children: [{
            id: 1,
            name: '施工环境监测',
            path: '/env',
            children: []
          }]
        },
        {
          id: 7,
          name: '用户管理',
          children: [{
            id: 1,
            name: '用户列表',
            path: '/users',
            children: []
          }]
        }
      ],
      isCollapse: false,
      activePath: ''
    }
  },
  // 钩子函数
  created () {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 点击按钮 收起侧边栏
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存连接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}

</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
}

.el-aside {
  background-color: #333744;

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.toggle-button {
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #ffffff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
