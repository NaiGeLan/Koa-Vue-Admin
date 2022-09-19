// import {get, post} from "../utils/request.js";
import request from '../utils/request'
// import {post} from "../utils/request"
const Api = {
    loginApi : '/users/login'
}
export const login = (params) => {
    return request({
        method:'post',
        data:params,
        url: Api.loginApi,
    })
}
