<script setup>
import {api} from "@/api/api.ts";
import {ref} from "vue";
import axios from "axios";
import router from "@/router/index.ts";
import {alertError, alertSuccess, axiosError} from "@/lib/requestAlert.ts";
import {setToken} from "@/lib/tokenLib.ts";
import md5 from 'md5'

const username = ref("");
const password = ref("");
const captcha = ref("")
const usernameRef = ref(null)
const passwordRef = ref(null)
const captchaRef = ref(null)
const formLoading = ref(false)

function loginHandler() {
  if (username.value.length && password.value.length) {
    formLoading.value = true
    let now = Math.round(new Date().getTime() / 1000) + ""
    let _secret = md5(md5(now) + md5(username.value) + md5(password.value))
    let secret = ""
    for (let i = 0;i < 32; i++) {
      secret += now.substring(i % 10, i % 10 + 1) + _secret.substring(i, i + 1)
    }
    axios.post(api.user.login, {
      username: username.value,
      password: password.value,
      captcha: captcha.value,
      secret
    }).then(res=>{
      if (res.data.code===200) {
        setToken(res)
        alertSuccess(res, "登录成功", () => router.push("/"))
      } else {
        alertError(res, "登录失败")
      }
    }).catch(err=>{
      axiosError(err, "登录失败");
    }).finally(() => formLoading.value = false)
  } else {
    alertError("账号密码不能为空", "登录失败")
  }
}
function enterHandler() {
  if (username.value.length === 0) {
    usernameRef.value.focus()
  } else if (password.value.length === 0) {
    passwordRef.value.focus()
  } else if (VARS.enableCaptcha === "Y") {
     if (captcha.value.length === 0) {
       captchaRef.value.focus()
     } else {
       loginHandler()
     }
  }else {
    loginHandler()
  }
}
</script>


<template>
  <main>
    <el-row justify="center" align="middle" class="row">
      <el-col :xs="22" :sm="18" :md="14" :lg="10" :xl="6">
        <el-card v-loading="formLoading">
          <template #header>
            <h1>登录</h1>
          </template>
          <template #default>
            <el-form label-width="auto" label-position="top">
              <el-form-item label="用户名">
                <el-input autofocus ref="usernameRef" v-model="username" placeholder="输入账号或邮箱" @keydown.enter="enterHandler" />
              </el-form-item>
              <el-form-item label="密码">
                <el-input ref="passwordRef" type="password" v-model="password" placeholder="输入密码" @keydown.enter="enterHandler" />
              </el-form-item>
              <el-row class="down-row">
                <el-col :span="12">
                  <el-link href="/forget">忘记密码</el-link>
                </el-col>
                <el-col :span="12" class="right">
                  <el-link href="/register">注册账号</el-link>
                </el-col>
              </el-row>
            </el-form>
          </template>
          <template #footer>
            <el-button class="login" type="primary" @click="loginHandler" size="large">登录</el-button>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </main>
</template>

<style scoped lang="scss">
main {
  height: 100%;
  .pointer {
    cursor: pointer;
  }
  .row {
    height: 100%;
  }
  .login {
    margin-top: 16px;
  }
  .down-row {
    margin: 0 16px;
    .right{
      text-align: right;
    }
  }
}
</style>