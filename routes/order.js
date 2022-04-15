var express = require('express');
var router = express.Router();
const User = require("../db/user");
const jwt = require("jsonwebtoken")
// 引入支付宝文件
const alipaySdk = require("../db/alipay");
const AlipayFormData = require("alipay-sdk/lib/form").default

var moment = require('moment'); // require

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.use("/*", function (req, res, next) {
  let body = req.headers.authorization || "";
  // console.log(body);
  let token = body.slice(7);
  // console.log(token);
  let secret = "shuosuo";
  try {
    let user = jwt.verify(token, secret);
    console.log(user);
  } catch (error) {
    res.status(401).send("请登录");
    return
  };
  next()
})

router.post("/", (req, res, next) => {
  let body = req.body;
  // console.log(body);
  let state = body.params.state
  // state:1表示第一次请求,未支付状态,直接进行存储
  if (state === 1) {
    let { list, username } = body.params;
    let time = new Date();
    let timeStamp = moment(time).valueOf()
    let ordernum = "" + timeStamp + Math.round(Math.random() * 100000);
    let order = { list, state, ordernum }
    User.updateOne({ "name": username }, { "$push": { "orderList": order } }, (err, data) => {
      // console.log("添加订单成功");
      // console.log(ordernum);
      res.send({ ordernum });
    })
  } else if (state === 2) {
    console.log(body.params);
    let { ordernum, username, paytype, totleprice, goods, address, list } = body.params;
    // 修改数据库内容, 将状态1改为状态2, 添加支付方式, 支付金额, 商品名称
    // User.updateOne({ "name": username, "orderList": { "$elemMatch": { "ordernum": ordernum, "state": 1 } } },
    //   { $set: { "orderList.$.state": 2, "orderList.$.paytype": paytype, "orderList.$.totleprice": totleprice, "orderList.$.goods": goods, "orderList.$.address": address, "orderList.$.list": list } }, (err, data) => { })


    // 生成支付跳转链接
    const formData = new AlipayFormData();
    // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
    formData.setMethod('get');
    // 支付时的信息
    formData.addField('bizContent', {
      outTradeNo: ordernum, //订单号
      productCode: 'FAST_INSTANT_TRADE_PAY', // 不用修改
      totalAmount: totleprice, // 金额
      subject: goods, //商品名称
    });
    // 支付成功或失败跳转的链接
    formData.addField('returnUrl', 'http://localhost:8080/payment');
    // 返回Promise
    const result = alipaySdk.exec(
      'alipay.trade.page.pay', {}, { formData: formData },
    );

    // 对接成功后,支付宝方返回的数据
    result.then(resp => {
      User.updateOne({ "name": username, "orderList": { "$elemMatch": { "ordernum": ordernum, "state": 1 } } },
        { $set: { "orderList.$.state": 2, "orderList.$.paytype": paytype, "orderList.$.totleprice": totleprice, "orderList.$.goods": goods, "orderList.$.address": address, "orderList.$.list": list, "orderList.$.payurl": resp } }, (err, data) => { })
      res.send({
        data: {
          success: true,
          msg: "支付中",
          url: resp
        }
      })
    })


  } else if (state === 3) {
    // 删除state=1的数据
    let { username, ordernum } = body.params;
    console.log("lail");
    User.updateOne({ "name": username }, { $pull: { "orderList": { "ordernum": ordernum, "state": 1 } } },
      (err, data) => {
        console.log(err, data);
      })
    res.send("删除订单成功")
  } else if (state === 4) {
    // 这是订单交易结束之后的删除
    let { username, ordernum } = body.params;
    console.log("lail");
    User.updateOne({ "name": username }, { $pull: { "orderList": { "ordernum": ordernum } } },
      (err, data) => {
        console.log(err, data);
      })
    res.send("删除订单成功")
  }
})

// 获取所有订单
router.post("/allorders", (req, res, next) => {
  // console.log(req.body.username, "===");
  let { username } = req.body
  User.find({ "name": username }, (err, data) => {
    // console.log(data);
    res.send(data[0].orderList)
  });
})

module.exports = router;
