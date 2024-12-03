// 引入模块
let mongoose = require('mongoose');
const Schema = mongoose.Schema 

const ProductType = {
    title:String,
    introduction:String, //简介
    detail:String,
    cover:String,
    editTime:Date
}

const ProductModel = mongoose.model("product", new Schema(ProductType))

module.exports = ProductModel
