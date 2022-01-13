import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import Vuex from '@/views/TheVuex.vue'
import Home from '@/views/TheHome.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    // 注意要加上 /
    path: '/vuex',
    name: 'Vuex',
    component: Vuex
  },
  {
    path: '/axios',
    name: 'Axios',
    component: () => import('@/views/TheAxios.vue') // 懒加载组件
  },
  {
    path: '/pinia',
    name: 'Pinia',
    component: () => import('@/views/ThePinia.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
