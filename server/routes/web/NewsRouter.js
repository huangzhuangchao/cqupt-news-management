const express = require("express")
const NewsController = require("../../controllers/web/NewsController")
const NewsRouter = express.Router()
//图片上传
// const multer  = require('multer')
// const upload = multer({ dest: 'public/newsuploads/' })
//涉及文件上传，需要multer中间件
// NewsRouter.post("/adminapi/news/add", upload.single("file"), NewsController.add)
// NewsRouter.post("/adminapi/news/list", upload.single("file"), NewsController.updateList)
NewsRouter.get("/webapi/news/list", NewsController.getList)
// NewsRouter.get("/adminapi/news/list/:id", NewsController.getlist)
// NewsRouter.put("/adminapi/news/publish", NewsController.publish)
// NewsRouter.delete("/adminapi/news/list/:id", NewsController.delList)

module.exports = NewsRouter