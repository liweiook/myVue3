import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/home.vue'
import Vuex from '@/views/vuex.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    // 注意要加上 /
    path: '/vuex',
    name: 'Vuex',
    component: Vuex,
  },
  {
    path: '/axios',
    name: 'Axios',
    component: () => import('@/views/axios.vue'), //懒加载组件
  },
  {
    path: '/pinia',
    name: 'Pinia',
    component: () => import('@/views/pinia.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
