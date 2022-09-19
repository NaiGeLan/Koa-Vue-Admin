// import {get, post} from "../utils/request.js";
import request from '../utils/request'
// import {post} from "../utils/request"
const Api = {
    loginApi : '/users/login'
}
// export const login = (params) => {
//     return request({
//         method:'post',
//         data:params,
//         url: Api.loginApi,
//     })
// }
export function loginApi(username, password) {
    const data = {
      username,
      password,
    }
    return request({
      url: Api.loginApi,
      headers: {
        isToken: false
      },
      method: 'post',
      data: data
    })
  }
  
//   // 注册方法
//   export function register(data) {
//     return request({
//       url: '/register',
//       headers: {
//         isToken: false
//       },
//       method: 'post',
//       data: data
//     })
//   }
  
//   // 获取用户详细信息
//   export function getInfo() {
//     return request({
//       url: '/getInfo',
//       method: 'get'
//     })
//   }
  
//   // 退出方法
//   export function logout() {
//     return request({
//       url: '/logout',
//       method: 'post'
//     })
//   }
  