var express = require('express');
var router = express.Router();
const Shopcart = require("../db/shopcart")

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/", (req, res) => {
  let data = req.body.params;
  console.log(data);
  console.log(data.state);
  switch (data.state) {
    // 状态1: 这里是添加商品至购物车
    case 1:
      Shopcart.create(data, (err, res) => {
        console.log("插入成功");
      });
      break;
    // 状态2: 此时是商品的数量发生了改变
    case 2:
      // console.log(123);
      Shopcart.updateOne({ "username": data.username, "id": data.id }, { $set: { "count": data.count } }, (err, result) => {
        if (err) {
          console.log(err);
          return
        }
        console.log("count修改成功");
        // console.log(result);
      });
      break;
    // 状态3是商品是否被选中
    case 3:
      Shopcart.updateOne({ "username": data.username, "id": data.id }, { $set: { "checked": data.checked } }, (err, result) => {
        if (err) {
          console.log(err);
          return
        }
        console.log("checked修改成功");
        // console.log(result);
      });
      break;
    // 状态4是全选按钮被按下时
    case 4:
      if (data.checked === false) {
        Shopcart.updateMany({ "username": data.username }, { $set: { "checked": false } }, (err, result) => {
          if (err) {
            console.log(err);
            return
          }
          console.log("checked全部修改false");
          console.log(result);
        })
      } else {
        Shopcart.updateMany({ "username": data.username }, { $set: { "checked": true } }, (err, result) => {
          if (err) {
            console.log(err);
            return
          }
          console.log("checked全部修改true");
          console.log(result);
        })
      }
      break;
    // 删除某产品
    case 5:
      Shopcart.deleteOne({ "username": data.username, "id": data.id }, (err, result) => {
        if (err) {
          console.log(err);
          return
        }
        console.log("删除成功");
        console.log(result);
      })
      break;

    // 删除订单中的商品
    case 6:
      console.log(data.username);
      Shopcart.deleteMany({ "username": data.username, "checked": true }, (err, data) => {
        if (err) {
          console.log(err);
          return
        }
      })
  }
  res.send("好了")
})

module.exports = router;
