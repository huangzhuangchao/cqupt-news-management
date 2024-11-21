// 引入模块
let mongoose = require('mongoose');
// 链接数据库
//mongodb://127.0.0.1数据库地址
// manmge 是数据库名，没有就创建，有直接使用这个数据库-数据库我们只需要链接一次
// 他会自动连接和断开
// mongoose.connect('mongodb://127.0.0.1/manmge').then(res => {
// console.log('链接成功')
// })

const Schema = mongoose.Schema 
const UserType = {
    username:String,
    password:String, 
    gender:Number, //性别 0，1
    introduction:String, //简介
    avatar:String, //头像
    role:Number //身份 管理员1 编辑2
}
// user模型 ==> users集合 创建一个user的模型，跟表（集合）一一映射
const UserModel = mongoose.model("user", new Schema(UserType))

module.exports = UserModel