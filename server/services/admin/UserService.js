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
     }
}
module.exports = UserService