const { createUser, getUserInfo, getUserList, getUserCount, updateUser, deleteUser } = require("../service/user.service");
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/config.default')
const util = require('../utils/utils')
class UserController {
  //注册功能
  async register(ctx) {
    // 1. 获取数据
    console.log(ctx.request.body)
    const { username, password, userEmail, mobile, state, role } = ctx.request.body;
    try {
       // 2. 操作数据库
      const res = await createUser(username, password,userEmail,mobile,state, role);
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
      const info = {...res}._doc
      console.log(info)
      const userInfo = {username:info.username,deptId:info.deptId,state:info.state,role:info.role,roleList:info.roleList}
      console.log(userInfo)
      const data = {token: jwt.sign(res,JWT_SECRET,{expiresIn:'1d'}),userInfo}
      ctx.body = util.success(util.CODE.SUCCESS,'用户登录成功',data)
    }catch(err){
      ctx.body = util.fail(util.CODE.BUSINESS_ERROR,'用户登录失败',err)
    }
  }
  //获取用户信息
  async getUserInfo(ctx){
    const info = ctx.state.user._doc
    console.log(info)
    const userInfo = {username:info.username,deptId:info.deptId,state:info.state,role:info.role,roleList:info.roleList}
    ctx.body = util.success(util.CODE.SUCCESS,'获取用户信息成功',userInfo)
  }
  //获取用户列表
  async getUserList(ctx){
    const {userId,username,state} = ctx.request.query
    const {page,skipIndex} = util.pager(ctx.request.query)
    let params = {}
    if(userId) params.userId = userId
    if(username) params.username = username
    if(state) params.state
    try {
      const query =  getUserList(params)
      const list = await query.skip(skipIndex).limit(page.pageSize)
      const total = await getUserCount(params)
      ctx.body = util.success(util.CODE.SUCCESS,'获取成功',{
        page: {
          ...page,
          total
        },
        list
      })
    }
    catch (err){
      ctx.body = util.fail(util.CODE.BUSINESS_ERROR,'获取失败')
    }
  }
  //编辑用户信息
  async updateUser(ctx){
    const {id,...params} = ctx.request.body
    try {
      const res = await updateUser(id, {...params})
      ctx.body = util.success(util.CODE.SUCCESS,'编辑成功',true)
    }catch (err){
      ctx.body = util.fail(util.CODE.BUSINESS_ERROR,'获取失败')
    }
  }
  //删除用户
  async deleteUser(ctx){
    const id = ctx.params.id
    console.log(ctx.params)
    try {
      const res = await deleteUser(id)
      if(res){
        ctx.body = util.success(util.CODE.SUCCESS,'删除成功',true)
      }else {
        return
      }
    }catch (err){
        ctx.body = util.fail(util.CODE.BUSINESS_ERROR,'删除失败',err)
    }
  }
  //批量删除
  async deleteMany(ctx){
    console.log(ctx.request.body)
  }
}

module.exports = new UserController();
