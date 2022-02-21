var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const Home_goods = require("../db/home_goods");
const Home_multiply = require("../db/home_multiply");
const Home_goods_all = require("../db/home_goods_all")

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/multidata", function (req, res, next) {
  Home_multiply.find({}, (err, data) => {
    // console.log(data);
    res.send(data)
  })
})

router.get("/data", function (req, res, next) {
  // console.log(req.query);
  let query = req.query;
  Home_goods.find({ "data.page": query.page * 1, "data.sort": query.type }, (err, data) => {
    // console.log(data);
    res.send(data)
  })
})

router.get("/search", function (req, res, next) {
  let query = req.query;
  console.log(query)
  let key = query.key;
  let page = query.page;
  let type = query.type;
  let stype = type === "价格" ? "data.price" : "data.sale";
  let state = query.state;
  let order = state * 1 === 1 ? 1 : -1;
  let reg = new RegExp(key, "i")
  // console.log(stype, order)
  // // { "result.itemInfo.desc": "2018秋季新款韩版百搭格子长袖衬衫+前短后长针织气质开衫外套+高腰直筒九分牛仔裤三件套装" }
  let pageLength = 30;

  // Home_goods_all.find({ "data.title": { $regex: reg } }).sort({ "data.price": 1 }).exec((err, data) => {
  //   let list = data.map(item => {
  //     return item.data.price
  //   })
  //   console.log(list);
  // })
  Home_goods_all.find({ "data.title": { $regex: reg } }).sort({ [stype]: order }).skip(pageLength * (page - 1)).limit(pageLength).exec((err, data) => {
    let list = data.map(item => {
      // console.log(item.data.price);
      return item.data
    })
    res.send(list)
  })
})

module.exports = router;
