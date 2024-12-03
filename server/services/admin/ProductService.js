const ProductModel = require("../../models/ProductModel")

const ProductService = {
    add: async ({ title, introduction, detail, cover, editTime }) => {
        return ProductModel.create({title, introduction, detail, cover, editTime})
        // return
    },
    getlist: async ({ _id }) => {
        if (_id) {
            return NewsModel.find({ _id })
        } else {
            return NewsModel.find({})
        }
    },

}

module.exports = ProductService