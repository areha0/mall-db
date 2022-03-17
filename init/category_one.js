// 这是是单纯的为了返回分类数据, 下面的category是为了可以查找分类
const Category_one = require("../db/category_one");
const superagent = require('superagent');

let baseUrl = "http://152.136.185.210:7878/api/hy66/category";

// 抓取数据具体函数
function getData() {
  // return new Promise((resolve, reject) => {
  superagent.get(baseUrl).end((err, res) => {
    // console.log(res.text)
    // resolve();
    let data = JSON.parse(res.text);
    Category_one.insertMany(data, () => {
      // console.log("添加成功");
    })
  })
  // })
}

module.exports = getData