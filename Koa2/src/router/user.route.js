// 用户管理模块
const Router = require('koa-router')
const util = require('../utils/utils')
const router = new Router({prefix: '/users'})

// const User = require('../model/user.model')
const {userValidator,verifyUser,cryptPassword,verifyLogin} = require('../middleware/user.middleware')

const {register} = require('../controller/user.controller')

const {login} = require('../controller/user.controller')

//注册接口
router.post('/register',userValidator,verifyUser,cryptPassword,register)
//登录接口
// router.post('/login',async (ctx) => {
//     try {
//         console.log(ctx.request.body);
//         const {username,password} = ctx.request.body
//         // ctx.body = {username,password}
//         // let response = {}
//         const res = await User.findOne({
//             username,
//             password
//         })
//         if(res) {
//             ctx.body = util.success(res)
//         }else {
//             ctx.body = util.fail("账号或密码不存在")
//         }
//         // console.log(res)
//         // .then((res) => {
//         //     console.log(res)
//         //     response = {...res}
//         //     ctx.body = util.success('成功')
            
//         // })
//         // ctx.body = util.success(res)
//         // if(res){
//         //     ctx.body = util.success(res)
//         // }else {
//         //     ctx.body = util.fail("账号或密码不正确")
//         // }
//     }
//     catch (err) {
//         ctx.body = util.fail(err)

//     }
    
//     // ctx.body = ctx.request.body
// })
router.post('/login',userValidator,verifyLogin,login)
module.exports = router