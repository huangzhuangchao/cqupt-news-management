const NewsService = require("../../services/admin/NewsService")

const NewsController = {
    add: async (req, res) =>{
        console.log(req.file, req.body);
        const cover = req.file ? `/newsuploads/${req.file.filename}` : ""
        console.log(req.body);
        
        const {title, content, category, isPublish} = req.body
        await NewsService.add({
            title, 
            content, 
            category:Number(category), 
            isPublish:Number(isPublish),
            cover,
            editTime:new Date()
        })
        res.send({
            ActionType:"OK"
        })
    },
    getlist: async(req, res)=>{        
        const result = await NewsService.getlist({_id:req.params.id})
        res.send({
            ActionType:"OK",
            data:result
        })
    },
    publish: async (req,res)=>{
        await NewsService.publish({...req.body, editTime: new Date()})
        // console.log({...req.body, editTime: new Date()});
        res.send({
            ActionType:"OK",
        })
    },
    delList: async (req, res)=>{
        await NewsService.delList({_id:req.params.id})
        res.send({
            ActionType:"OK",
        })
    },
    updateList: async (req,res)=>{
        const cover = req.file ? `/newsuploads/${req.file.filename}` : ""
        console.log(req.body);
        
        const {title, content, category, isPublish, _id} = req.body
        await NewsService.updateList({
            _id,
            title, 
            content, 
            category:Number(category), 
            isPublish:Number(isPublish),
            cover,
            editTime:new Date()
        })
        res.send({
            ActionType:"OK"
        })
    }
}

module.exports = NewsController