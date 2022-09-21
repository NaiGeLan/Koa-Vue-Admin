import axios from 'axios'
import { ElNotification , ElMessageBox, ElMessage, ElLoading } from 'element-plus'
import { tansParams } from './common'
import { getToken } from './auth'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL:  'http://127.0.0.1:8000',
    // 超时
    timeout: 10000
})

service.interceptors.request.use(config => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    if (getToken() && !isToken) {
        config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?' + tansParams(config.params);
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  if (config.method === 'post' || config.method === 'put') {
    const requestObj = {
      url: config.url,
      data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
      time: new Date().getTime()
    }
  }
  return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

service.interceptors.response.use(res => {
    console.log(res.data.code)
    const code = res.data.code || 200
    const msg = res.data.msg
     if (code === 500) {
        ElMessage({
          message: msg,
          type: 'error'
        })
        return Promise.reject(new Error(msg))
      } else if (code !== 200) {
        ElNotification.error({
          title: msg
        })
        return Promise.reject('error')
      } else if(code === 200){
         ElMessage({
             message: msg,
             type: 'success',
             duration: 2 * 1000
         })
        return  Promise.resolve(res.data)
      }
}, error => {
    console.log('err' + error)
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    }
    else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    }
    else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    ElMessage({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
})

export default service
