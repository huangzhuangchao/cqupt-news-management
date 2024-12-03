// const ProductService = require("../../services/admin/ProductService")

const ProductService = require("../../services/admin/ProductService")

const ProductController = {
    add: async (req, res) =>{
        console.log(req.file, req.body);
        const cover = req.file ? `/productuploads/${req.file.filename}` : ""
        console.log(req.body);
        
        const {title, introduction, detail} = req.body
        await ProductService.add({
            title, 
            introduction, 
            detail,
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