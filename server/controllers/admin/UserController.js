const UserService = require("../../services/admin/UserService")

const UserController = {
    login: async (req, res)=>{
       const result = await UserService.login(req.body)
       if(result.length === 0){
            res.send({
                code:-1,
                error:"用户名或密码错误"
            })
       }else{
            res.send({
                ActionType:"OK"
            })
       }
    }
}

module.exports = UserController