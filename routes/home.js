var express = require('express');
var router = express.Router();
const Home_goods = require("../db/home_goods");
const Home_multiply = require("../db/home_multiply")

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

module.exports = router;
