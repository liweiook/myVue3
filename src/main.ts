import { createApp } from 'vue'
import ElementPlus from 'element-plus'

// 路由
import router from '@/router'
// elementPlus
import 'element-plus/dist/index.css'

// 使用vuex4
// import store from '@/store'
// createApp(App).use(store).use(router).mount('#app')

// 使用pinia
import pinia from '@/store/pinia'
import App from './App.vue'
// 链式调用s
createApp(App).use(pinia).use(router).use(ElementPlus).mount('#app')
