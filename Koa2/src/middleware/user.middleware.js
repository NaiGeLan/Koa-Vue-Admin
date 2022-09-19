const bcrypt = require('bcryptjs')

const {getUserInfo} = require("../service/user.service")
const util = require('../utils/utils')
//判断表单是否完整
const userValidator = async (ctx,next)=>{
    console.log(ctx.request.body)
    const { username,password} = ctx.request.body
     //合法性
     if(!username||!password){
        ctx.status = 400
        ctx.body = util.fail(util.CODE.PARAM_ERROR,'用户名或密码为空')
        return
      }
      await next()
}
//查数据库表，看用户是否存在
const verifyUser = async (ctx,next)=>{
      const {username} = ctx.request.body
      //合理性
      ctx.status = 409
      if(await getUserInfo({username})){
        ctx.body = util.fail(util.CODE.USER_EXIST,'用户已经存在')
        return
       }
       await next()
}
//将用户密码加密
const cryptPassword =async (ctx,next)=>{
    const {password} = ctx.request.body

    const salt = bcrypt.genSaltSync(10);
    //hash保存的是密文
    const hash = bcrypt.hashSync(password,salt)

    ctx.request.body.password = hash

    await next()
}
//判断用户是否存在（不存在报错）
const verifyLogin = async (ctx,next)=>{
    const {username,password} = ctx.request.body
    try {
        const res = await getUserInfo({username})
        if(!res){
            // console.error('用户名不存在',{username});
            ctx.status = 409
            // ctx.body = {
            //     code: "10004",
            //     message: "用户不存在",
            //     result: "",
            // }
            ctx.body = util.fail(util.CODE.USER_NOT_EXIST,'用户不存在')
            return
        }
        //密码是否匹配（不匹配报错）
        if(!bcrypt.compareSync(password,res.password)){
            ctx.status = 500
            ctx.body = util.fail(util.CODE.USER_ACCOUNT_ERROR,'密码错误')
            // ctx.body = {
            //     code: "10006",
            //     message: "密码错误",
            //     result: "",
            // }
            return
        }
        await next()
    }catch(err){
        console.error(err);
        ctx.status = 500
        ctx.body = util.fail(util.CODE.BUSINESS_ERROR,'用户登录失败')
        // ctx.body = {
        //     code: "10005",
        //     message: "用户登录失败",
        //     result: "",
        // }
        return
    }



}

module.exports = {
    userValidator,
    verifyUser,
    cryptPassword,
    verifyLogin,
}
