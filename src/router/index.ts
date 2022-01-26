import { createRouter, createWebHashHistory, RouteRecordRaw, RouterOptions } from 'vue-router'

import Vuex from '@/views/TheVuex.vue'
import Home from '@/views/TheHome.vue'
import Login from '@/views/base/TheLogin.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/s',
    name: 'Login',
    component: Login
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

const routerParams: RouterOptions = {
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
}
const router = createRouter(routerParams)

// 去除重复路由报错的问题
const originalPush = router.push
router.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export function resetRouter() {
  const newRouter = createRouter(routerParams)
  router.resolve = newRouter.resolve
}

export default router
