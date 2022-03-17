// 获取主页面中的数据(包括轮播图,以及建议)
const Recommend = require("../db/recommend_data");
const superagent = require('superagent');

let baseUrl = "http://152.136.185.210:7878/api/hy66/recommend";

// 抓取数据具体函数
function getData() {
  // return new Promise((resolve, reject) => {
  superagent.get(baseUrl).end((err, res) => {
    // console.log(res.text)
    // resolve();
    let data = JSON.parse(res.text)
    Recommend.insertMany(data, () => {
      // console.log("添加成功");
    })
  })
  // })
}

module.exports = getData