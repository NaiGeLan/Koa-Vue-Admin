import axios from 'axios'
import { ElNotification , ElMessageBox, ElMessage, ElLoading } from 'element-plus'
import { tansParams } from './common'
import { getToken } from './auth'
import router from '../router/index'
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
    console.log(config)
  if (config.method === 'get' && config.params) {
    let url = config.url + '?' + tansParams(config.params);
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

service.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
      ElMessage.error('服务端异常！')
      return Promise.reject(res)
    }
    // console.log(res.data.code)
    const code = res.data.code || 200
    const msg = res.data.msg
      if(code === 30001){
        console.log('跳转登陆');
        router.push({ path: '/login' })
        ElNotification.error({
          title: msg
        })
      }
     else if(code === 200){
        return  Promise.resolve(res.data)
      }
      else{
        ElNotification.error({
          title: msg
        })
        return Promise.reject('error')
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
