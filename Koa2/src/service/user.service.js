const User = require("../model/user.model");
class UserService {
  async createUser(username, password, userEmail,mobile,state,role) {
    //todo:写入数据库
    const res = await User.create({
      //表的字段
      username,
      password,
      userEmail,
      mobile,
      state,
      role
    });
    console.log(res);
    return res;
  }
  async getUserInfo({username,password}){
    console.log(username)
    const res =  await User.findOne({
      username
    })
    return res?res:null
  }
   getUserList(params){
    const res = User.find(params,{password:0})
    console.log(res)
    return res
  }
  async getUserCount(params){
    const res = await User.countDocuments(params)
    return res
  }
  async updateUser(id,params){
    const res = await User.findByIdAndUpdate(id,params)
    console.log(res)
    return res
  }
  async deleteUser(id){
    const res = await User.findByIdAndDelete(id)
    return res
  }
}
module.exports = new UserService();
