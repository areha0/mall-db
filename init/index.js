// 将所有数据存入数据库
const process = require("process");
const Home_multiply = require('./home_multiply');
const Home_goods = require("./home_goods");
const Home_goods_all = require("./home_goods_all");
const Detail_data = require("./detail_data");
const Recommend = require("./recommend");
const Subcategory = require("./subcategory");
const Category = require("./category");
const Category_one = require("./category_one");
const Category_goods = require("./category_goods");

(async () => {
  await Home_multiply();
  await Home_goods();
  await Home_goods_all();
  await Detail_data();
  await Recommend();
  await Subcategory();
  await Category();
  await Category_one();
  await Category_goods()

  process.on('exit', () => {
    console.log(`数据抓取完毕`);
  });
  process.exit()
})()



