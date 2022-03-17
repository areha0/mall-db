// 获取主页面中的数据(包括轮播图,以及建议)
const Category = require("../db/category");
const superagent = require('superagent');

let baseUrl = "http://152.136.185.210:7878/api/hy66/category";

// 抓取数据具体函数
function getData() {
  // return new Promise((resolve, reject) => {
  superagent.get(baseUrl).end((err, res) => {
    // console.log(res.text)
    // resolve();
    let text = JSON.parse(res.text);
    // console.log(text.data.category.list);
    let list = text.data.category.list;
    list.forEach(data => {
      // console.log(data, "123");
      Category.insertMany({ "data": data }, () => {
        // console.log("添加成功");
      })
    })
  })
  // })
}

module.exports = getData