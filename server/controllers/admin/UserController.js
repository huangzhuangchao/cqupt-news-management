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
            //console.log(result[0]);
        
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
    },
    upload: async (req, res)=>{
        // console.log(req.body, req.file, req.files); 
        const token = req.headers["authorization"].split(" ")[1]
        const payload = JWT.verify(token)
        console.log(payload._id);
        //调用service存储更新数据
        const {username, introduction, gender} = req.body
        const result = {
            ActionType:"OK",
            data:{
                username, 
                introduction, 
                gender:Number(gender), 
            }
        }
        //单独判断一下是否有上传头像文件
        if(req.file){
            const avatar = `/avataruploads/${req.file.filename}`
            await UserService.upload({_id:payload._id, username, introduction, gender:Number(gender), avatar})    
            result.data.avatar = avatar
        }else{
            await UserService.upload({_id:payload._id, username, introduction, gender:Number(gender)})  
        }
        res.send(result)  
    },

    add: async (req, res) =>{
        const {username, introduction, gender, password, role} = req.body 
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ""
        console.log(avatar);
        
        await UserService.add({username, introduction, gender:Number(gender), password, role:Number(role), avatar})
        res.send({
            ActionType:"OK",
        })
    },

    userList: async (req, res) =>{
        const result = await UserService.userList({_id:req.params.id})
        res.send({
            ActionType:"OK",
            data:result
        })
    },
    delUser: async (req, res) =>{
        const result = await UserService.delUser({_id:req.params.id})
        // console.log(result);
        
        res.send({
            ActionType:"OK",
        })
    },
    putUser: async (req, res) =>{
        // const {username, password, role} = req.body
        const result = await UserService.putUser(req.body)
        // console.log(result);    
        res.send({
            ActionType:"OK"
        })
    }
}

module.exports = UserController