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
    }

}

module.exports = NewsController