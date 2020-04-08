<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/lejian.png" alt />
        <span>乐剪后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏菜单 -->
      <el-aside :width="isCollapse ? '64px' : '10%'">
        <div class="toggle-button" @click="toggleCollapse">||||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="this.$route.path"
        >
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单区域模板 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              v-for="subItem in item.children"
              :key="subItem.id"
              :index="'/'+subItem.path"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 主菜单 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menuList: [
        {
          authName: '会员管理',
          children: [
            {
              authName: '会员列表',
              id: 1251,
              path: 'members'
            },
            {
              authName: '会员充值',
              id: 1586,
              path: 'recharge'
            },
            {
              authName: '添加会员',
              id: 68563,
              path: 'addmember'
            }
          ],
          id: 1001,
          order: 1
        },
        {
          authName: '套餐管理',
          children: [
            {
              authName: '服务套餐列表',
              id: 1031,
              path: 'servicelist'
            },
            {
              authName: '增加服务套餐',
              id: 1032,
              path: 'addservice'
            }
          ],
          id: 1002,
          order: 1
        },
        {
          authName: '店员管理',
          children: [
            {
              authName: '店员列表',
              id: 1011,
              path: 'waiterlist'
            },
            {
              authName: '增加店员',
              id: 1012,
              path: 'addwaiter'
            },
            {
              authName: '角色',
              id: 10122,
              path: 'roles'
            }
          ],
          id: 1003,
          order: 1
        },
        {
          authName: '订单管理',
          children: [
            {
              authName: '进行中',
              id: 1002,
              path: 'orderring'
            },
            {
              authName: '预约中',
              id: 1421,
              path: 'reservation'
            },
            {
              authName: '订单表',
              id: 1021,
              path: 'orderlist'
            }
          ],
          id: 1004,
          order: 1
        },
        {
          authName: '数据统计',
          children: [
            {
              authName: '会员报表',
              id: 1452,
              path: 'reports'
            },
            {
              authName: '收入报表',
              id: 1451,
              path: 'Membershipstatistics'
            },
            {
              authName: '员工报表',
              id: 1453,
              path: 'moneytatistics'
            }
          ],
          id: 1005,
          order: 1
        },
        {
          authName: '进购管理',
          children: [
            {
              authName: '进购表单',
              id: 14522,
              path: 'purchaselist'
            },
            {
              authName: '进购记录',
              id: 10451,
              path: 'historypurchase'
            }
          ],
          id: 1006,
          order: 1
        },
        {
          authName: '其他管理',
          children: [
            {
              authName: '预览本店',
              id: 6221,
              path: 'lookshop'
            },
            {
              authName: '进购记录',
              id: 1751,
              path: 'historypurchase'
            }
          ],
          id: 1007,
          order: 1
        }
      ],
      iconsObj: {
        1001: 'el-icon-user-solid',
        1002: 'el-icon-setting',
        1003: 'el-icon-shopping-bag-1',
        1004: 'el-icon-tickets',
        1005: 'el-icon-s-data',
        1006: 'el-icon-sell',
        1007: 'el-icon-position'
      },
      isCollapse: false
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList () {
      // const { data: res } = await this.$http.get('home')
      // console.log(res)
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style lang="less" scope>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 30px;
    }
  }
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
.home-container {
  height: 100%;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.3em;
  cursor: pointer;
}
</style>
