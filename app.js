var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 引入路由对应的页面
var loginRouter = require('./routes/login');
let shopcarpRouter = require("./routes/shopcart");
let registerRouter = require("./routes/register");
let homeRouter = require("./routes/home");
let detailRouter = require("./routes/detail");
let recommendRouter = require("./routes/recommend");
let categoryRouter = require("./routes/category");
let subcategoryRouter = require("./routes/subcategory")
let orderRouter = require("./routes/order");
let paymentRouter = require("./routes/payment")
// 数据库连接


// console.log(123);
var app = express();


// view engine setup
// ejs引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// 生成的express文件其实就已经自动实现了对post请求数据的解析
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// cookie解析
app.use(cookieParser());
// 静态页面托管
app.use(express.static(path.join(__dirname, 'public')));

// 后端设置跨域问题
// app.use('/*', function (req, res, next) {
//   // 设置请求头为允许跨域
//   res.header("Access-Control-Allow-Origin", "*");
//   // 设置服务器支持的所有头信息字段
//   res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//   // 设置服务器支持的所有跨域请求的方法
//   res.header("Access-Control-Allow-Methods", "POST,GET");
//   // next()方法表示进入下一个路由
//   next();
// });

// 路由管理
app.use('/login', loginRouter);
app.use("/shopcart", shopcarpRouter);
app.use("/register", registerRouter);
app.use("/home", homeRouter);
app.use("/detail", detailRouter);
app.use("/recommend", recommendRouter);
app.use("/category", categoryRouter);
app.use("/subcategory", subcategoryRouter);
app.use("/order", orderRouter);
app.use("/payment", paymentRouter)

// 404报错
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
