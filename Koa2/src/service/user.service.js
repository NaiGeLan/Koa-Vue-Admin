const User = require("../model/user.model");
class UserService {
  async createUser(username, password) {
    //todo:写入数据库
    const res = await User.create({
      //表的字段
      username,
      password,
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
}
module.exports = new UserService();
