var express = require('express');
var router = express.Router();
const User = require("../db/user")

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
    let { ordernum, username, paytype, totleprice } = body.params;
    User.updateOne({ "name": username, "orderList": { "$elemMatch": { "ordernum": ordernum, "state": 1 } } },
      { $set: { "orderList.$.state": 2, "orderList.$.paytype": paytype, "orderList.$.totleprice": totleprice } }, (err, data) => {
        // console.log(err);
        // console.log(data);
      })

    res.send("状态更新完成")
  }
})


module.exports = router;
