var express = require('express');
var router = express.Router();

/* 这个文件只用于注册子路由，具体处理逻辑在controllers文件夹. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
