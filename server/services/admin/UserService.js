const UserModel = require("../../models/UserModel")

const UserService = {
    login: async ({username, password}) =>{
        return UserModel.find({username, password})
    },
    upload: async ({_id, username, introduction, gender, avatar=false}) =>{
       if(avatar){
        return UserModel.updateOne({_id}, {
            username, introduction, gender, avatar
        })
       }else{
        return UserModel.updateOne({_id}, {
            username, introduction, gender
        })
       }
    },
    add: async ({username, introduction, gender, password, role, avatar}) =>{
        if(avatar){
         return UserModel.create({username, introduction, gender, password, role, avatar})
        }else{          
         return UserModel.create({username, introduction, gender, password, role})
        }
     },
    userList: async ({_id}) =>{
       return _id ?  UserModel.find({_id},["username", "role", "password"]) : UserModel.find({},["username", "role", "avatar", "introduction", "gender"])
    },
    delUser: async ({_id})=>{
        return UserModel.deleteOne({_id})
    },
    putUser: async ({_id, username, password, role})=>{
        return UserModel.updateOne({_id}, {username, password, role})
    }
}
module.exports = UserService