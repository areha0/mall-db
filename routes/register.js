var express = require('express');
var router = express.Router();
const User = require("../db/user")

router.use(express.json());
router.use(express.urlencoded({ extended: false }));


router.post("/", function (req, res, next) {
  let body = req.body;
  let data = body.params;
  console.log(data);
  User.find({ "name": data.name }, (err, result) => {
    // 表示数据库中已存在该用户名
    // console.log(result);
    if (result.length !== 0) {
      res.send({ "state": 0 })
    } else {
      // 下面就是将注册信息存入到user表中
      User.create(data, (err, result) => {
        if (err) {
          console.log("user注册插入失败");
          res.send("注册失败")
          return
        }
        console.log("user注册插入成功");
        res.send({ "state": 1 })
      })
    }
  })


})

module.exports = router;
