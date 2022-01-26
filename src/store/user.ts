import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/login'
import { ILoginParams } from '#/user'
import { resetRouter } from '@/router'

const userState = {
  token: getToken(),
  username: '',
  password: '',
  rememberMe: false,
  code: '',
  uuid: '',
  currentOrg: {
    OrgId: '',
    OrgName: ''
  }
}

export const useUserStore = defineStore({
  id: 'user',
  state: () => userState,
  actions: {
    // 登录
    async Login(userInfo: ILoginParams) {
      try {
        userInfo.username = userInfo.username.trim()
        const { data } = await login(userInfo)
        this.token = data
        setToken(data)
        return data
      } catch (error) {
        return error
      }
    },
    fedLogOut() {
      removeToken()
      this.$state = userState
      resetRouter()
    }
  },
  // 数据持久化：需要安装插件pinia-plugin-persist
  persist: {
    // 开启缓存
    enabled: true
  }
})
