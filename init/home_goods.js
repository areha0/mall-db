// 获取主页面的商品数据: 其中就分为三类sell, pop, new, 以及页面
// http://152.136.185.210:7878/api/hy66/home/data?type=sell&page=1
const Home_goods = require("../db/home_goods");
const superagent = require('superagent');

let baseUrl = "http://152.136.185.210:7878/api/hy66/home/data";

// 抓取数据具体函数
function getData() {
  // return new Promise((resolve, reject) => {
  let typeArr = ["sell", "new", "pop"];
  let urlArr = [];
  let pageLength = 20;
  for (let i = 0; i < typeArr.length; i++) {
    for (let j = 1; j <= pageLength; j++) {
      urlArr.push(`${baseUrl}?type=${typeArr[i]}&page=${j}`)
    }
  };
  // console.log(urlArr[0]);
  for (let i = 0; i < urlArr.length; i++) {
    superagent.get(urlArr[i]).end((err, res) => {
      // console.log(456);
      // resolve()
      // console.log(res.text);
      let data = JSON.parse(res.text);
      Home_goods.insertMany(data, () => {
        // resolve()
        // console.log("添加成功");
      })
    })
  }
  // })
}

module.exports = getData
// getData()



