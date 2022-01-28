var express = require('express');
var router = express.Router();
const Category_one = require("../db/category_one")

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/", function (req, res, next) {
  Category_one.find({}, (err, data) => {
    // console.log(data);
    res.send(data)
  })
})


module.exports = router;
