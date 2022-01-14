import { createApp } from 'vue'
import ElementPlus from 'element-plus'

// 路由
import router from '@/router'

// elementPlus
import 'element-plus/dist/index.css'

/* 默认英文，引入中文包 */
import locale from 'element-plus/lib/locale/lang/zh-cn'

// 使用vuex4
// import store from '@/store'
// createApp(App).use(store).use(router).mount('#app')

// 使用pinia
import pinia from '@/store/pinia'
import App from './App.vue'
// 链式调用
createApp(App)
  .use(pinia)
  .use(router)
  .use(ElementPlus, { locale, size: /* Cookies.get('size') || */ 'medium' })
  .mount('#app')
