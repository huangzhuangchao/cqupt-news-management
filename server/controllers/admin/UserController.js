const UserService = require("../../services/admin/UserService")
const JWT = require("../../util/JWT")
const UserController = {
    login: async (req, res)=>{
       const result = await UserService.login(req.body)
       
       if(result.length === 0){
            res.send({
                code:-1,
                error:"用户名或密码错误"
            })
       }else{
        console.log(result[0]);
        
            // 生成token，设置在header中 现已改到app中间件中
            const token = JWT.generate({
                _id:result[0]._id,
                username:result[0].username
            }, "2h")
            res.header("Authorization", token)
            res.send({
                ActionType:"OK",
                data:{
                    username:result[0].username,
                    gender:result[0].gender? result[0].gender : 0, //0表示保密
                    introduction:result[0].introduction, 
                    avatar:result[0].avatar, 
                    role:result[0].role 
                }
            })
       }
    }
}

module.exports = UserController