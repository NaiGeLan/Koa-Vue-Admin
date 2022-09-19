const { createUser, getUserInfo } = require("../service/user.service");
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/config.default')
const util = require('../utils/utils')
class UserController {
  //注册功能
  async register(ctx) {
    // 1. 获取数据
    console.log(ctx.request.body)
    const { username, password } = ctx.request.body;
    try {
       // 2. 操作数据库
      const res = await createUser(username, password);
      const data = {
        id: res.id,
        username: res.username,
      }
      // 3. 返回结果
      ctx.body = util.success(util.CODE.SUCCESS, '用户注册成功',data)
    } catch (err) {
      ctx.status = 500
      ctx.body = util.fail(util.CODE.BUSINESS_ERROR,'用户注册错误',err)
    }
  }
  //登陆功能
  async login(ctx) {
    console.log(ctx.request.body)
    const {username} = ctx.request.body
    //获取用户信息（token的payload中要记录id，username，is_admin）
    try {
      // 从返回对象结果中剔除password属性，其他属性放在res对象
      const {password,...res} = await getUserInfo({username})
      const data = {token: jwt.sign(res,JWT_SECRET,{expiresIn:'1d'})}
      ctx.body = util.success(util.CODE.SUCCESS,'用户登录成功',data)
    }catch(err){
      ctx.body = util.fail(util.CODE.BUSINESS_ERROR,'用户登录失败',err)
    }
  }
}

module.exports = new UserController();
