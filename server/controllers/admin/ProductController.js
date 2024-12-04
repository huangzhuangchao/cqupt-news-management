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
        const result = await ProductService.getlist({_id:req.params.id})
        res.send({
            ActionType:"OK",
            data:result
        })
    },
    dellist: async(req, res)=>{
        const result = await ProductService.dellist({_id:req.params.id})
        res.send({
            ActionType:"OK",
        })
    },
    updateList: async(req, res) =>{
        const cover = req.file ? `/productuploads/${req.file.filename}` : ""
        console.log(req.body);
        
        const {title, introduction, detail, _id} = req.body
        await ProductService.updateList({
            _id,
            title, 
            introduction, 
            detail,
            cover,
            editTime:new Date()
        })
        res.send({
            ActionType:"OK"
        })
    }
    
}

module.exports = ProductController