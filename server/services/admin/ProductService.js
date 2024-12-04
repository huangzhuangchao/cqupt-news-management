const ProductModel = require("../../models/ProductModel")

const ProductService = {
    add: async ({ title, introduction, detail, cover, editTime }) => {
        return ProductModel.create({title, introduction, detail, cover, editTime})
        // return
    },
    getlist: async ({ _id }) => {
        if (_id) {
            return ProductModel.find({ _id })
        } else {
            return ProductModel.find({})
        }
    },
    dellist: async ({_id}) =>{
        return ProductModel.deleteOne({_id})
    },
    updateList : async({ _id, title, introduction, detail, cover, editTime}) =>{
        if (cover) {
            return ProductModel.updateOne({ _id }, {
                title, introduction, detail, cover, editTime
            })
        } else {
            return ProductModel.updateOne({ _id }, {
                title, introduction, detail, cover, editTime
            })
        }
    }

}

module.exports = ProductService