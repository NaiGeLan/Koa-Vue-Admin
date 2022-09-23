const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config.default')
const util = require('../utils/utils')
const auth = async (ctx,next)=>{
    const {authorization} = ctx.request.header
    
    // console.log(token);
    if(!authorization){
        // ctx.status = 409
        ctx.body = util.fail(util.CODE.USER_LOGIN_ERROR,'用户未登录')
        return 
    }else {
        try {
            const token = authorization.replace('Bearer ','')
            //user包含payload信息
            const user = jwt.verify(token,JWT_SECRET)
            // console.log(user);
            ctx.state.user = user
           } catch (error) {
            switch(error.name){
                case 'TokenExpiredError':
                    // console.error('token已过期',error);
                    ctx.status = 401
                    ctx.body = util.fail(util.CODE.AUTH_ERROR,'token过期')
                    // ctx.body = {
                    //     code: '10101',
                    //     message: 'token过期',
                    //     result:''
                    // }
                    return
                case 'jsonWebTokenError':
                    // console.error('无效token',error);
                    ctx.status = 401
                    ctx.body = util.fail(util.CODE.AUTH_ERROR,'无效的token')
                    // ctx.body = {
                    //     code: '10102',
                    //     message: '无效的token',
                    //     result:''
                    // }
                    return
            }
           }
    }
   
    await next()
}
module.exports = {auth}
