// 这个集合中所存储的是首页中所有的商品基本信息
// 目的是为了根据关键字进行搜索,并进行展示

const mongoose = require("./db")
const Home_goods_all = mongoose.Schema({
  "data": Object,
}, { versionKey: false });

module.exports = mongoose.model("home_goods_all", Home_goods_all, "home_goods_all");