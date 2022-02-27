var express = require('express');
var router = express.Router();
const User = require("../db/user");
// 引入支付宝文件
const alipaySdk = require("../db/alipay");
const AlipayFormData = require("alipay-sdk/lib/form").default;
// 用于请求
const superagent = require('superagent');


router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/", (req, res, next) => {
  let body = req.body;
  // console.log(body);
  let { out_trade_no, trade_no, username, ordernum } = body.params;
  // 支付宝配置, 具体详情可以参考order.js
  const formData = new AlipayFormData();
  formData.setMethod('get');
  formData.addField('bizContent', {
    out_trade_no,
    trade_no
  });
  const result = alipaySdk.exec(
    'alipay.trade.query', {}, { formData: formData },
  );

  // 后端请求支付宝
  result.then(resdata => {
    // console.log(resdata);
    superagent.get(resdata).end((err, data) => {
      let text = JSON.parse(data.text);
      // console.log(text);
      let response = text.alipay_trade_query_response;
      // 表示支付成功
      console.log(response);
      if (response.code === "10000") {
        // 判断订单结果
        switch (response.trade_status) {
          // 1表示交易失败, 前两个都不需要更改数据库
          case "WAIT_BUYER_PAY ":
            res.send({ code: 1, msg: "有交易记录,没付款" })
            break;
          case "TRADE_CLOSED":
            res.send({ code: 1, msg: "交易关闭" });
            break;
          // 2的话表示交易完成, 需要将用户中的订单由2改为3
          case "TRADE_SUCCESS":
            User.updateOne({ "name": username, "orderList": { "$elemMatch": { "ordernum": ordernum, "state": 2 } } },
              { $set: { "orderList.$.state": 3 } }, (err, data) => { })
            res.send({ code: 2, msg: "交易成功" });
            break;
          case "TRADE_FINISHED":
            res.send({ code: 2, msg: "交易结束,不可退款" });
            break
        }
      } else if (response.code = "40004") {
        res.send({ code: 1, msg: "交易不存在" })
      }
    })
  }).catch(err => {
    res.send({ code: 500, msg: "交易失败" })
  })
})

module.exports = router;
