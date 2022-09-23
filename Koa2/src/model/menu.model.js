const mongoose = require('mongoose');
const menuSchema = mongoose.Schema({
    menuType:Number,//菜单类型
    menuName:String,//菜单名称
    menuCode:String,//权限标识
    path:String,//路由地址
    icon:String,//图标
    componet:String,//组件地址
    menuState:Number,//菜单状态
    parentId:[mongoose.Types.ObjectId],//父级菜单
    "createTime":{
      type:Date,
      default:Date.now()
    },
    "updateTime": {
      type:Date,
      default:Date.now()
    },
    "remark":String
})

module.exports = mongoose.model("menu", menuSchema,"menu")