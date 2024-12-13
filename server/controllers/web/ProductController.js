const ProductService = require('../../services/web/ProductService')

const ProductController = {
    getList: async (req, res) =>{
        const data = await ProductService.getlist({_id:req.params.id})
        res.send({
            ActionType:"OK",
            data:data
        })
    }
}

module.exports = ProductController
