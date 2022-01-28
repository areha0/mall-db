var express = require('express');
var router = express.Router();
const Subcategory = require("../db/subcategory");
const Category = require("../db/category");
const Category_goods = require("../db/category_goods")

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/", function (req, res, next) {
  // console.log(req.query);
  let query = req.query;
  Category.find({ "data.maitKey": query.maitKey }, (err, data) => {
    // console.log(data);
    let title = data[0].data.title;
    // console.log(title);
    Subcategory.find({ "data.info.title": title }, (err, data2) => {
      // console.log(data2);
      res.send(data2)
    })
  })
})

router.get("/detail", function (req, res, next) {
  // console.log(req.query);
  let query = req.query;
  // console.log(query);
  let miniWallkey = query.miniWallkey;
  let type = query.type;
  Category_goods.find({ "miniWallkey": miniWallkey, "type": type }, (err, data) => {
    // console.log(data[0].data);
    res.send(data[0].data)
  })
})


module.exports = router;
