var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const Home_goods = require("../db/home_goods");
const Home_multiply = require("../db/home_multiply");
const Detail_data = require("../db/detail_data");

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

router.post("/search", function (req, res, next) {
  let key = req.body.key;
  // console.log(key);
  let reg = new RegExp(key, "i")
  // { "result.itemInfo.desc": "2018秋季新款韩版百搭格子长袖衬衫+前短后长针织气质开衫外套+高腰直筒九分牛仔裤三件套装" }
  Detail_data.find({ "result.itemInfo.desc": { $regex: reg } }, (err, data) => {
    // console.log(data);
    res.send(data)
  })
})

module.exports = router;
