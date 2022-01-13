// 创建一个store
// https://juejin.cn/post/7049196967770980389
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user', // id必填,且唯一
  // 必须要使用箭头函数，不然name的类型推断会出错
  // 如果要return的是Object类型，则不能为x=>{name:'张三'},需要改为x=>({name:'张三'})
  state: () => ({ name: '张三', age: 18, gender: '男' }),
  actions: {
    updateName(name: string) {
      this.name = name
    }
  },
  getters: {
    fullName: state => `${state.name}丰`
  },
  // 数据持久化：需要安装插件pinia-plugin-persist
  persist: {
    // 开启缓存
    enabled: true,
    strategies: [
      {
        // 自定义key
        key: 'my_user',
        // 将缓存从会话缓存改为本地缓存
        storage: localStorage,
        // 只缓存name和age
        paths: ['name', 'age']
      }
    ]
  }
})
