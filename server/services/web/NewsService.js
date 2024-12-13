const NewsModel = require("../../models/NewsModel")

const NewsService = {
    add: async ({ title, content, category, isPublish, cover, editTime }) => {
        return NewsModel.create({
            title, content, category, isPublish, cover, editTime
        })
        // return
    },
    getlist: async ({ _id }) => {
        if (_id) {
            return NewsModel.find({ _id, isPublish:1 }).sort({editTime:-1})
        } else {
            return NewsModel.find({isPublish:1}).sort({editTime:-1}) //对查询结果逆序排序
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
    },
    getTopList: async ({limit}) =>{
        // console.log(limit);
        return NewsModel.find({isPublish:1}).sort({editTime:-1}).limit(limit)
    }
}

module.exports = NewsService