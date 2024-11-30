const NewsModel = require("../../models/NewsModel")

const NewsService = {
    add: async ({title, content, category, isPublish, cover, editTime}) => {
        return NewsModel.create({
            title, content, category, isPublish, cover, editTime
        })
        // return
    },
    getlist: async () => {
        return NewsModel.find({})
    },
    publish: async ({_id, editTime, isPublish})=>{
        return NewsModel.updateOne({_id}, {
            isPublish, editTime
        })
    }
}

module.exports = NewsService