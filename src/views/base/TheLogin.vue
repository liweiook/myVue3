<template>
  <div class="login" :style="{ backgroundImage: 'url(' + logoBgUrl + ')' }">
    <div class="login-form">
      <div class="left-img">
        <img :src="loginLeftImgUrl" alt="" />
      </div>
      <div class="form-box">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
          <div class="right-box">
            <h3 class="title">
              <span>欢迎来到</span>
              <img :src="logoUrl" alt="" />
            </h3>
            <p class="supplement">{{ cmsName }}</p>
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                type="text"
                auto-complete="off"
                placeholder="账号"
              >
                <template #prefix>
                  <svg-icon icon-class="user" class="el-input__icon input-icon" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                auto-complete="off"
                placeholder="密码"
                @keyup.enter="handleLogin"
              >
                <template #prefix>
                  <svg-icon icon-class="password" class="el-input__icon input-icon" />
                </template>
              </el-input>
            </el-form-item>
            <el-checkbox v-model="loginForm.rememberMe" style="margin: 0px 0px 25px 0px">
              记住密码
            </el-checkbox>
            <el-form-item style="width: 100%">
              <el-button
                :loading="loading"
                size="medium"
                type="primary"
                style="width: 100%; height: 40px"
                @click.prevent="handleLogin"
              >
                <span v-if="!loading">登 录</span>
                <span v-else>登 录 中...</span>
              </el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>{{ cmsName }}V{{ version }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Cookies from 'js-cookie'
import { encrypt, decrypt } from '@/utils/jsencrypt'
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { getCodeImg } from '@/api/login'

const { loginLeftImgUrl } = window.globalVar
const { logoBgUrl } = window.globalVar
const { logoUrl } = window.globalVar
const { cmsName } = window.globalVar
const { version } = require('package.json')

const router = useRouter()
const userStore = useUserStore()
// https://www.jianshu.com/p/db72d66dad0a，官方不推荐用getCurrentInstance()代替this
// const { proxy } = getCurrentInstance()
// 获取$ref不能ref(null)，不然访问的时候ts：possibly null
const loginRef = ref()

const loginForm = reactive({
  username: '',
  password: '',
  rememberMe: false,
  code: '',
  uuid: ''
})

// 表单规则
const loginRules = {
  username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
  password: [
    {
      required: true,
      trigger: 'blur',
      message: '密码不能为空'
    }
  ],
  code: [{ required: true, trigger: 'change', message: '请输入验证码' }]
}

// 获取cookie中记录用户信息
const username = Cookies.get('username')
const password = Cookies.get('password')
const rememberMe = Cookies.get('rememberMe')
loginForm.username = username || loginForm.username
loginForm.password = password ? decrypt(password) : loginForm.password
/*  根据有无remembberME来判断
    如果rememberME为true，则Cookies.get('rememberMe')为”true“，Boolean(rememberMe)为true，loginForm为true
   如果如果rememberME为false，则Cookies.get('rememberMe')为undefined。loginForm为false
*/
loginForm.rememberMe = rememberMe ? Boolean(rememberMe) : false

const loading = ref(false)
const { redirect } = useRoute().query

// 验证码开关
const captchaOnOff = ref(true)
const codeUrl = ref('')

// 验证码
const getCode = () => {
  getCodeImg().then(res => {
    captchaOnOff.value = res.captchaOnOff === undefined ? true : res.captchaOnOff
    if (captchaOnOff.value) {
      codeUrl.value = `data:image/gif;base64,${res.img}`
      loginForm.uuid = res.uuid
    }
  })
}

// 点击登录
const handleLogin = async () => {
  loginRef.value.validate(valid => {
    if (valid) {
      loading.value = true
      // 勾选了需要记住密码设置在cookie中设置记住用户明和名命
      if (loginForm.rememberMe) {
        Cookies.set('username', loginForm.username, { expires: 30 })
        Cookies.set('password', encrypt(loginForm.password), { expires: 30 })
        Cookies.set('rememberMe', String(loginForm.rememberMe), { expires: 30 })
      } else {
        // 否则移除
        Cookies.remove('username')
        Cookies.remove('password')
        Cookies.remove('rememberMe')
      }
      // 调用action的登录方法
      userStore
        .Login(loginForm)
        .then(() => {
          router.push({ path: String(redirect) || '/' })
        })
        .catch(() => {
          // 重新获取验证码
          if (captchaOnOff.value) {
            getCode()
          }
        })
        .finally(() => {
          loading.value = false
        })
    }
  })
}
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  // background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}
.title {
  color: #707070;
  margin: 40px 0 0;
  overflow: hidden;
  white-space: nowrap;
  span {
    font-size: 45px;
    margin-right: 10px;
  }
  img {
    height: 25px;
    width: auto;
  }
}
.supplement {
  font-size: 28px;
  margin-top: 2px;
  margin-bottom: 80px;
  height: 50px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 1000px;
  height: 640px;
  box-shadow: 0px 0px 12px 5px rgba(188, 188, 188, 0.2);
  display: flex;
  .left-img {
    width: 448px;
    border-right: 1px solid #f0f0f0;
    box-sizing: border-box;
    padding: 30px 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right-box {
    padding: 50px;
  }
  .form-box {
    flex: 1;
  }
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #a6a6a6;
  font-family: Arial;
  font-size: 18px;
  letter-spacing: 1px;
  font-weight: 400;
}
.login-code-img {
  height: 38px;
}
</style>
