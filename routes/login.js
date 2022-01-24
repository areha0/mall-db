var express = require('express');
var router = express.Router();
const User = require("../db/user")
const Shopcart = require("../db/shopcart")

router.use(express.json());
router.use(express.urlencoded({ extended: false }));


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

module.exports = router;
