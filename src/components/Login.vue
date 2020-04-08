<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 登录区域 -->
            <el-form class="login_form" :rules="LoginFormRules" ref="LoginRef" label-width="0px" :model="loginForm">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username"  prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                <el-form-item prop="password" >
                    <el-input v-model="loginForm.password" type="password"  prefix-icon="el-icon-question"></el-input>
                </el-form-item>
                <el-form-item class="btns" label="">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="primary" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      LoginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 10, message: '用户名长度为5-10', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '用户名长度为5-10', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      console.log(this)
      this.$refs.LoginRef.resetFields()
    },
    login () {
      this.$refs.LoginRef.validate(valid => {
        console.log(valid)
        if (valid === true) {
          this.$message.success('登录成功')
          this.$router.push('/home')
        } else {
          this.$message.error('登录失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
}
.login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    right: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    .avatar_box {
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }

}
.btns {
    display: flex;
    justify-content: flex-end
}
.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
</style>
