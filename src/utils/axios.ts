import Axios from 'axios'
import { ElMessage } from 'element-plus'

const baseURL = 'http://api.github.com'

const axios = Axios.create({
  baseURL,
  timeout: 10000
})

// 前置拦截器 （发起请求之前的拦截）
axios.interceptors.request.use(
  config =>
    /**
     * 需要根据项目实际情况来对 config 做处理
     * 这里对 config 不做任何处理，直接返回
     */
    config,
  error => Promise.reject(error)
)

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  response =>
    /**
     * 根据项目实际情况来对 response 和 error 做处理
     * 这里对 response 和 error 不做任何处理，直接返回
     */
    response,
  error => {
    if (error.response && error.response.data) {
      const code = error.response.status
      const msg = error.response.data.message
      ElMessage.error(`Code:${code},Messagee:${msg}`)
      // eslint-disable-next-line
      console.log(`Axios Error`, 'error.response')
    } else {
      ElMessage.error(`${error}`)
    }
    return Promise.reject(error)
  }
)

export default axios
