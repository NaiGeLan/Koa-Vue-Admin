// 用户管理模块
const Router = require('koa-router')
const util = require('../utils/utils')
const router = new Router({prefix: '/users'})
const {auth} = require('../middleware/auth.middleware')
// const User = require('../model/user.model')
const {userValidator,verifyUser,cryptPassword,verifyLogin, } = require('../middleware/user.middleware')

// const {register} = require('../controller/user.controller')

const {login, getUserInfo,getUserList,register,updateUser,deleteUser,deleteMany} = require('../controller/user.controller')

//添加用户接口
router.post('/register',userValidator,verifyUser,cryptPassword,register)
//登录接口
router.post('/login',userValidator,verifyLogin,login)
//获取用户信息
router.get('/getInfo',auth,getUserInfo)
//获取用户列表
router.get('/list',auth,getUserList)
//编辑用户
router.post('/update',auth,updateUser)
//删除用户
router.delete('/delete/:id',auth,deleteUser)
//批量删除
router.post('/delete',deleteMany)
module.exports = router
