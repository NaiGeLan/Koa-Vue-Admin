import request from '../utils/request'
const Api = {
    getlist : '/message/list',
    getInfoApi : '/users/getInfo'
}
export function getMessageListApi(){
    return request({
        url:Api.getlist,
        method: 'get'
    })
}