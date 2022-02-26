var express = require('express');
var router = express.Router();
const User = require("../db/user");
// 引入支付宝文件
const alipaySdk = require("../db/alipay");
const AlipayFormData = require("alipay-sdk/lib/form").default

var moment = require('moment'); // require

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

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
    // console.log(body.params);
    let { ordernum, username, paytype, totleprice, goods } = body.params;
    // 修改数据库内容, 将状态1改为状态2, 添加支付方式, 支付金额, 商品名称
    User.updateOne({ "name": username, "orderList": { "$elemMatch": { "ordernum": ordernum, "state": 1 } } },
      { $set: { "orderList.$.state": 2, "orderList.$.paytype": paytype, "orderList.$.totleprice": totleprice, "orderList.$.goods": goods } }, (err, data) => { })


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
      res.send({
        data: {
          success: true,
          msg: "支付中",
          url: resp
        }
      })
    })


  }
})


module.exports = router;
