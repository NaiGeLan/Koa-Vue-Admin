//通用工具函数
const log4js = require('./log4j.utils');
const CODE = {
    SUCCESS: 200,
    PARAM_ERROR:  10001, //参数错误
    USER_ACCOUNT_ERROR: 20001, //账号密码错误
    USER_LOGIN_ERROR: 30001, // 用户未登陆
    BUSINESS_ERROR: 40001, // 业务请求失败
    AUTH_ERROR: 50001, // 认证失败或者TOKEN过期
    USER_EXIST: 60001, // 用户已存在
    USER_NOT_EXIST: 60002, // 用户已存在
}
module.exports = {
    pager({pageNum=1,pageSize=10}){
        pageNum*=1
        pageSize*=1
        const skipIndex = (pageNum-1)*pageSize
        return {
            page:{
                pageNum,
                pageSize,
            },
            skipIndex
        }
    },
    success(code=CODE.SUCCESS,msg='',data='',){
        log4js.info(data)
        return {
            code,msg,data
        }
    },
    fail(code=CODE.BUSINESS_ERROR,msg='',data=null){
        log4js.error(msg)
        return {
            code,msg,data
        }
    },
    CODE

}