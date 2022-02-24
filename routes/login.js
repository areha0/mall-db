var express = require('express');
var router = express.Router();
const User = require("../db/user")
const Shopcart = require("../db/shopcart")

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// 登录检查用户名及密码,以及传递购物车信息
router.post("/", function (req, res, next) {
  let body = req.body;
  let params = body.params;
  // console.log(params);
  User.find({ "name": params.username }, (err, data) => {
    if (err) {
      console.log(err);
      res.send({ "state": 0 })
      return
    };
    // 用户名不存在
    // console.log(data);
    if (data.length === 0) {
      res.send({ "state": 1 });
    } else {
      // 开始比对密码是否错误
      User.find({ "name": params.username, "password": params.password }, (err, data) => {
        // console.log(data);
        if (data.length === 0) res.send({ "state": 2 })
        else {
          // 将购物车中的信息聚合到用户中
          User.aggregate([
            {
              $lookup: {
                from: "shopcart",
                localField: "name",
                foreignField: "username",
                as: "shopcart"
              },

            },
            {
              $match: { "name": params.username }
            }
          ], (err, result) => {
            // console.log(result);
            res.send({ "state": 3, result })
          })
        }
      })
    }
  })
})

// 修改用户中的搜索历史
router.post("/keys", function (req, res, next) {
  let body = req.body;
  console.log(body);
  User.updateOne({ "name": body.username }, { "searchHistory": body.key })
  res.send("修改搜索历史成功")
})

// 修改用户中的地址列表
router.post("/address", function (req, res, next) {
  let body = req.body;
  let { username, addressArr } = body;
  // console.log(addressArr);
  User.updateOne({ "name": username }, { "addressList": addressArr })
  res.send("发的地址我看到了")
})
module.exports = router;
