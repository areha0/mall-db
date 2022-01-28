var express = require('express');
var router = express.Router();
const Detail_data = require("../db/detail_data");
const Recommend = require("../db/recommend_data")

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/", function (req, res, next) {
  // console.log(req.query);
  let query = req.query;
  Detail_data.find({ "iid": query.iid }, (err, data) => {
    // console.log(data);
    res.send(data)
  })
})


module.exports = router;
