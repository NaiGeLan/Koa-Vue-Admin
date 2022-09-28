// import {get, post} from "../utils/request.js";
import request from '../utils/request'
// import {post} from "../utils/request"
const Api = {
    loginApi : '/users/login',
    getInfoApi : '/users/getInfo',
    getUserListApi: '/users/list',
    addUserApi:'/users/register',
    updateUserApi: '/users/update',
    deleteUserApi: '/users/delete/'
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
      data
    })
  }

//   // 注册方法
//   export function addUserApi(params) {
//     return request({
//       url: Api.addUserApi,
//       method: 'post',
//         headers: {
//             isToken: false
//         },
//         params
//     })
//   }

export function addUserApi(data){
    return request({
        url:Api.addUserApi,
        method:'post',
        headers:{
            isToken: false
        },
        data
    })
}
//   // 获取用户详细信息
  export function getInfoApi() {
    return request({
      url: Api.getInfoApi,
      method: 'get',
        // message:'谢谢你'
    })
  }

  export function getUserListApi(params) {
    return request({
        url: Api.getUserListApi,
        method: 'get',
        params
    })
  }
export function updateUserApi(data) {
    return request({
        url: Api.updateUserApi,
        method: 'post',
        data
    })
}
export function deleteUserApi(id) {
    return request({
        url: Api.deleteUserApi+id,
        method: 'delete',
        // params
    })
}
export function deleteManyApi(data){
    return request({
        url:Api.deleteUserApi,
        method:'post',
        data
    })
}
//   // 退出方法
//   export function logout() {
//     return request({
//       url: '/logout',
//       method: 'post'
//     })
//   }
