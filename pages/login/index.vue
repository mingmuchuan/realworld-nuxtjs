<!--
 * @Author: your name
 * @Date: 2020-12-14 10:30:09
 * @LastEditTime: 2020-12-16 17:54:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /realworld-nuxtjs/pages/login/index.vue
-->
<template>
    <div class="auth-page">
        <div class="container page">
          <div class="row">
      
            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center"> {{ isLogin ? 'sign in' : 'sign up' }}</h1>
              <p class="text-xs-center">
                <!-- <a href="">Have an account?</a> -->
                <nuxt-link v-if="isLogin" to="/register">去注册</nuxt-link>
                <nuxt-link v-else to="/login">去登录</nuxt-link>
                

              </p>
      
              <ul class="error-messages">
                <template v-for="(messages, filed) in errors">
                  <li v-for="(value, index) in messages" :key="index">{{ filed }}: {{ value }}</li>
                </template>
              </ul>
      
              <form @submit.prevent="onSubmit">
                <fieldset class="form-group" v-if="!isLogin">
                  <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="email" placeholder="Email" v-model="user.email" required>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password" minlength="8">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">
                  {{ isLogin ? 'sign in' : 'sign up' }}
                </button>
              </form>
            </div>
      
          </div>
        </div>
      </div>
</template>
<script>
import { login, register } from '@/apis/user'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  middleware: 'noauth',
  data() {
    return {
      user: {
        email: '',
        password: "",
        username: ""
      },
      errors: {}
    }
  },
  computed: {
      isLogin() {
          return this.$route.name === 'login'
      }
  },
  methods: {
    async onSubmit() {
      try {
        let { data: { user } } = this.isLogin ? await login(this.user) : await register(this.user)
        this.$store.commit('setUser', user)
        Cookie.set('user', user)
        this.$router.push("/")
      } catch(e) {
        this.errors = e.response.data.errors
      }
    }
  }
}
</script>