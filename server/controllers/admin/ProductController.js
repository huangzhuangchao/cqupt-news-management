const ProductService = require("../../services/admin/ProductService")

const ProductController = {
    add: async (req, res) =>{
        console.log(req.file, req.body);
        const cover = req.file ? `/newsuploads/${req.file.filename}` : ""
        console.log(req.body);
        
        const {title, content, category, isPublish} = req.body
        await ProductService.add({
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
    
}

module.exports = ProductController