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
var app = express();

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
