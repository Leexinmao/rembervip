<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-row :gutter="30">
        <el-col :span="8">
          <!-- 搜索框 -->
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            class="input-with-select"
            clearable
            @clear="getUserList()"
          >
            <el-button @click="getUserList()" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUserDialog=true">添加会员</el-button>
        </el-col>
      </el-row>
      <!-- 用户显示区域 -->
      <el-table :data="memberList" stripe border>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="Fusername"></el-table-column>
        <el-table-column label="邮箱" prop="Femail"></el-table-column>
        <el-table-column label="电话" prop="Fmobile"></el-table-column>
        <el-table-column label="余额" prop="blance"></el-table-column>
        <el-table-column label="消费" prop="consumption"></el-table-column>
        <el-table-column label="积分" prop="integral"></el-table-column>
        <el-table-column label="加入时间" prop="add_time"></el-table-column>
        <el-table-column label="生日" prop="happybirthday"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_status" @change="userStatueChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template>
            <el-button type="primary" icon="el-icon-edit" @click="editUser()" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <el-tooltip effect="dark" :enterable="false" content="分配角色" placement="top">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <!-- size-change切换每页多少条后触发事件 -->
      <!-- current-change页码值发生改变触发事件 -->
      <!-- current-page当前是第几页的数据 -->
      <!-- page-sizes下拉菜单每页显示多少条 -->
      <!-- page-size当前每页显示多少条 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 3, 5, 7]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加用户弹框 -->
    <el-dialog title="添加员工" :visible.sync="addUserDialog" width="30%" @close="addDialogClosed">
      <!-- <span>添加员工</span> -->
      <!-- 添加员工的表单 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormref" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户弹框 -->
    <el-dialog title="编辑用户" :visible.sync="editUserDialog" width="50%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="editUserDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },
      memberList: [
        {
          username: 'admin',
          email: 'codecancebyte@163.com',
          mobile: '15736476604',
          role_name: '超级管理员',
          mg_status: true
        },
        {
          username: 'lxm',
          email: 'codecancebyte@163.com',
          mobile: '15736476604',
          role_name: '超级管理员',
          mg_status: false
        },
        {
          username: 'hhl',
          email: 'codecancebyte@163.com',
          mobile: '15736476604',
          role_name: '超级管理员',
          mg_status: true
        },
        {
          username: 'mm',
          email: 'codecancebyte@163.com',
          mobile: '15736476604',
          role_name: '超级管理员',
          mg_status: false
        }
      ],
      total: 0,
      addUserDialog: false,
      // 添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加表单的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机', trigger: 'blur' }]
      },
      // 控制修改对话框
      editUserDialog: false
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      this.total = this.memberList.length
      console.log(this.total)
      const { data: res } = await this.$http.get('item/listmembers')
      // this.memberList = r
      console.log(res.data)
      console.log(res)
      this.memberList = res
      this.total = this.memberList.length
      console.log(this.total)

      // const { data: res } = await this.$http.get('users', {
      //   parms: this.queryInfo
      // })
      // if (res.meta.status !== 200) return this.$message.error('获取失败')
      // console.log(res)
      // this.userList = res.data.userList
      // this.total = res.data.total
    },
    // 监听pagesize改变事件
    handleSizeChange (newsize) {
      this.queryInfo.pagesize = newsize
      console.log(this.queryInfo.pagesize)
    },
    // 监听页码改变的事件
    handleCurrentChange (newpage) {
      this.queryInfo.pagenum = newpage
      console.log(this.queryInfo.pagenum)
    },
    async userStatueChange (userinfo) {
      // 监听switch开关的改变
      console.log(userinfo.mg_status)
      // const { data: res} = await this.$http.put(
      //   `users/${userinfo.id}/state/${userinfo.mg_status}`
      // )
      // console.log(res)
      //   if (res.meta.status !== 200) {
      //     userinfo.mg_status = !userinfo.mg_status
      //     return this.message.error('更新用户失败')
      //   }
      //   return this.message.success('更新用户状态成功')
    },
    addDialogClosed () {
      this.$refs.addFormref.resetFields()
    },
    addUser () {
      this.$refs.addFormref.validate(async valid => {
        // 如果校验成功返回true  失败则为false
        console.log(valid)
        // if (!valid) return
        // const { data: res } = await this.$http.post('users', this.addForm)
        // if (res.meta.status !== 201) {
        //   this.$message.error('添加员工失败')
        // }
        // this.$message.success('添加用户成功')
        // this.addUserDialog = false
        // this.getUserList()
        if (!valid) return
        this.addUserDialog = false
      })
    },
    // 编辑用户对话框
    editUser () {
      this.editUserDialog = true
    }
  }
}
</script>

<style lang="less" scoped>
</style>
