// 所有的商品数据集合,不再按照页码和类型进行分页
const Home_goods_all = require("../db/home_goods_all");
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
      let list = JSON.parse(res.text).data.list;
      list.forEach(item => {
        Home_goods_all.insertMany({ "data": item }, () => {
          console.log("添加成功");
        })
      });
    })
  }
  // })
}

// module.exports = getData
getData()



