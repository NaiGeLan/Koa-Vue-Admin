// 用户管理模块
const Router = require('koa-router')
const util = require('../utils/utils')
const router = new Router({prefix: '/users'})
const {auth} = require('../middleware/auth.middleware')
// const User = require('../model/user.model')
const {userValidator,verifyUser,cryptPassword,verifyLogin} = require('../middleware/user.middleware')

const {register} = require('../controller/user.controller')

const {login, getUserInfo} = require('../controller/user.controller')

//注册接口
router.post('/register',userValidator,verifyUser,cryptPassword,register)
//登录接口
router.post('/login',userValidator,verifyLogin,login)
//获取用户信息
router.get('/getInfo',auth,getUserInfo)
module.exports = router
