// 获取主页面中的数据(包括轮播图,以及建议)
const Category_goods = require("../db/category_goods")
const superagent = require('superagent');
const eventproxy = require("eventproxy");
const res = require("express/lib/response");



let baseUrl = "http://152.136.185.210:7878/api/hy66/category";
let baseUrl2 = "http://152.136.185.210:7878/api/hy66/subcategory/detail";
// http://152.136.185.210:7878/api/hy66/subcategory/detail?miniWallkey=52014&type=new

let ep = new eventproxy();

// 抓取数据具体函数
function getData() {
  superagent.get(baseUrl).end((err, res) => {
    let data = JSON.parse(res.text)
    let list = data.data.category.list;
    ep.emit("category", list)
  });

  ep.after("category", 1, (data) => {
    // console.log(data[0].length);
    let categoryList = [];
    let type = ["pop", "new", "sell"]
    for (let i = 0; i < type.length; i++) {
      for (let j = 0; j < data[0].length; j++) {
        categoryList.push(`${baseUrl2}?miniWallkey=${data[0][j].miniWallkey}&type=${type[i]}`)
      }
    };
    // console.log(categoryList);

    categoryList.forEach((item) => {
      superagent.get(item).end((err, res) => {
        // console.log(res.text);
        let data = JSON.parse(res.text);
        // console.log(item);
        let query = item.split("?")[1];
        // console.log(query);
        let queryArr = query.split("&");
        let miniWallkey = queryArr[0].split("=")[1];
        let type = queryArr[1].split("=")[1];
        // console.log(miniWallkey, type);
        Category_goods.insertMany({
          "data": data,
          "miniWallkey": miniWallkey,
          "type": type
        }, () => {
          // console.log("添加成功");
        })
        // data.forEach((item2) => {
        //   Category_goods.insertMany({
        //     "data": item2,
        //     "miniWallkey": miniWallkey,
        //     "type": type
        //   }, () => {
        //     console.log("添加成功");
        //   })
        // })
      })
    })

  })

}

module.exports = getData