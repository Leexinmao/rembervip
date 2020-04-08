import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './../components/Login.vue'
import Welcome from './../components/Welcome.vue'
import Home from './../components/Home.vue'
import Member from './../components/member/Member.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/members',
        component: Member
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
