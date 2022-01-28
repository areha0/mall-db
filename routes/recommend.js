var express = require('express');
var router = express.Router();
const Recommend = require("../db/recommend_data")

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/", function (req, res, next) {
  Recommend.find({}, (err, data) => {
    res.send(data)
  })
})


module.exports = router;
