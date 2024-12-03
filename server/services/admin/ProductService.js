const ProductModel = require("../../models/ProductModel")

const NewsService = {
    add: async ({ title, content, category, isPublish, cover, editTime }) => {
        return NewsModel.create({
            title, content, category, isPublish, cover, editTime
        })
        // return
    },
    getlist: async ({ _id }) => {
        if (_id) {
            return NewsModel.find({ _id })
        } else {
            return NewsModel.find({})
        }
    },
    publish: async ({ _id, editTime, isPublish }) => {
        return NewsModel.updateOne({ _id }, {
            isPublish, editTime
        })
    },
    delList: async (_id) => {
        return NewsModel.deleteOne({ _id })
    },
    updateList: async ({ _id, title, content, category, isPublish, cover, editTime }) => {
        if (cover) {
            return NewsModel.updateOne({ _id }, {
                title, content, category, isPublish, cover, editTime
            })
        } else {
            return NewsModel.updateOne({ _id }, {
                title, content, category, isPublish, editTime
            })
        }
    }
}

module.exports = NewsService