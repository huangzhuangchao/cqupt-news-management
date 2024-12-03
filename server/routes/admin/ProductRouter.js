const express = require("express")
const ProductController = require("../../controllers/admin/ProductController")
const ProductRouter = express.Router()
//图片上传
const multer  = require('multer')
const upload = multer({ dest: 'public/productuploads/' })
//涉及文件上传，需要multer中间件
ProductRouter.post("/adminapi/product/add", upload.single("file"), ProductController.add)

module.exports = ProductRouter