// 创建一个 Pinia并在main.ts中挂载到app上
import { createPinia } from 'pinia'
// 数据持久化
import piniaPluginPersist from 'pinia-plugin-persist'

const pinia = createPinia()
pinia.use(piniaPluginPersist)

export default pinia
