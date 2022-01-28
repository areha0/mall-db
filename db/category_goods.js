const mongoose = require("./db")
const Category_goods = mongoose.Schema({
  "data": Object,
  "type": String,
  "miniWallkey": String
}, { versionKey: false });

module.exports = mongoose.model("category_goods", Category_goods, "category_goods");