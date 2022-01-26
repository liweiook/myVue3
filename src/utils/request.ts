import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import Message from '@/utils/message'
import { ElMessageBox, ElLoading, ElMessage } from 'element-plus'
import { getToken } from '@/utils/auth'
import { useUserStore } from '@/store/user'
import errorCode from '@/utils/errorCode'
import { tansParams, blobValidate } from '@/utils/ruoyi'
import { saveAs } from 'file-saver'

const userStore = useUserStore()
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: import.meta.env.VITE_APP_BASE_API as string | undefined,
  // 超时
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
    'Content-Type': 'application/json'
  }
})

let loading: any // 加载动画
let hasPermission: boolean = false // 当401时会弹层提示 此字段用来防止二次弹层
const indexPath: string =
  import.meta.env.VITE_APP_ENV === 'production' ? window.globalVar.indexPath : '/'

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken()
    // $state可以拿到整个state。
    const userInfo = userStore && userStore.$state
    if (token && userInfo && token !== userInfo.token) {
      window.location.href = indexPath
    }
    // 请求头中添加当前组织id
    config.headers!.CURRENT_ORG_ID = userInfo?.currentOrg.OrgId

    if (userInfo?.token) {
      config.headers!['X-AUTH-TOKEN'] = token
    }
    // 判断是否需要价值动画
    const flag =
      config.params && config.params.ElementLoading
        ? config.params
        : config.data && config.data.ElementLoading
        ? config.data
        : null

    if (flag) {
      if (flag) {
        delete flag.ElementLoading
      }
      loading = ElLoading.service({
        text: '操作中...',
        spinner: 'el-icon-loading ElementLoading',
        background: 'rgba(0, 0, 0, 0.2)'
      })
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    if (loading) {
      loading.close()
    }
    const res = response.data
    if (!res.ok) {
      if (res.respCode === '-1') {
        // 默认-1  只有为-1时才做轻提示
        const message = res.message.replace(/^\s*|\s*$/g, '') || '服务端错误'
        Message({
          message,
          type: 'warning',
          duration: 5 * 1000
        })
      }
      return Promise.reject(res)
    }
    return res
  },
  (error: AxiosError) => {
    if (loading) {
      loading.close()
    }
    if (!error.response) {
      if (error.message.includes('timeout')) {
        Message({
          message: '请求超时',
          type: 'error',
          duration: 5 * 1000
        })
      } else {
        // eslint-disable-next-line
        console.log(error.message)
      }
    } else {
      const { status } = error.response
      if (status === 401) {
        if (!hasPermission) {
          setTimeout(() => {
            const currentPath = window.location.hash.match(/(\w+)\/?/)
            const isLoadingPath = currentPath && currentPath[0] === 'login'
            if (!isLoadingPath) {
              hasPermission = true
              ElMessageBox.confirm('系统已注销，可以取消以停留在此页面，或重新登录', '确认注销', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
              })
                .then(() => {
                  userStore.fedLogOut()
                  window.location.reload()
                })
                .catch(() => {
                  hasPermission = false
                })
            } else {
              Message({
                message: '系统已注销，请重新登录',
                type: 'warning',
                duration: 3 * 1000
              })
            }
          }, 300)
        }
      } else if (status === 404) {
        Message({
          message: '访问资源未找到',
          type: 'error',
          duration: 5 * 1000
        })
      } else {
        Message({
          message: '服务端错误',
          type: 'error',
          duration: 5 * 1000
        })
      }
    }
    return Promise.reject()
  }
)

service.get = (url, params, headers = {}, timeout = 10000): any =>
  service({
    url,
    method: 'get',
    params,
    headers,
    timeout
  })

service.put = (url, data): any =>
  service({
    url,
    method: 'put',
    data
  })

service.post = (url, data): any =>
  service({
    url,
    method: 'post',
    data
  })

service.delete = (url, params): any =>
  service({
    url,
    method: 'delete',
    params
  })

// 通用下载方法
export async function download(url, params, filename) {
  const downloadLoadingInstance = ElLoading.service({
    text: '正在下载数据，请稍候',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  const data: Blob = await service.post(url, params, {
    transformRequest: [params => tansParams(params)],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    responseType: 'blob'
  })
  const isLogin = await blobValidate(data)
  if (isLogin) {
    const blob = new Blob([data])
    saveAs(blob, filename)
  } else {
    const resText = await data.text()
    const rspObj = JSON.parse(resText)
    const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode.default
    ElMessage.error(errMsg)
  }
  downloadLoadingInstance.close()
  // .catch(r => {
  //   console.error(r)
  //   ElMessage.error('下载文件出现错误，请联系管理员！')
  //   downloadLoadingInstance.close()
  // })
}

export default service
