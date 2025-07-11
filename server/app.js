var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const UserRouter = require("./routes/admin/UserRouter");
const JWT = require('./util/JWT');
const NewsRouter = require('./routes/admin/NewsRouter');
const webNewsRouter = require('./routes/web/NewsRouter');
const ProductRouter = require("./routes/admin/ProductRouter")
const webProductRouter = require("./routes/web/ProductRouter")
const cors = require('cors');
var app = express();

// 允许来自特定IP地址的请求
const corsOptions = {
  origin: 'http://1.94.6.107', // 或者 'http://1.94.6.107:5173' 如果你有特定端口
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 根据需要添加其他HTTP方法
  // allowedHeaders: ['Content-Type', 'Authorization'] // 根据需要添加其他头部
};

app.use(cors(corsOptions));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(webNewsRouter)
app.use(webProductRouter)
app.use((req, res, next)=>{
  //如果token有效就next，否则返回401
  console.log(req.url);
  if("/adminapi/user/login" == req.url){
    next()
    return;
  }
  const token = req.headers["authorization"].split(" ")[1]
  if(token){
    const payload = JWT.verify(token)
    if(payload){
      const newToken = JWT.generate({
        _id:payload._id,
        username:payload.username
      }, "2h")
      res.header("Authorization", newToken)
      next()
    }else{
      res.status(401).send({
        errCode:"-1",
        errorInfo:"token已过期"
      })
    }
  }
})

//使用UserRouter
app.use(UserRouter)
//使用NewsRouter
app.use(NewsRouter)
//ProductRouter路由
app.use(ProductRouter)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
