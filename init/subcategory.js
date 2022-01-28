// 获取主页面中的数据(包括轮播图,以及建议)
const Subcategory = require("../db/subcategory");
const superagent = require('superagent');
const eventproxy = require("eventproxy");



let baseUrl = "http://152.136.185.210:7878/api/hy66/category";
// let baseUrl2 = "http://152.136.185.210:7878/api/hy66/subcategory?maitKey=602";
let baseUrl2 = "http://152.136.185.210:7878/api/hy66/subcategory";

let ep = new eventproxy();

// 抓取数据具体函数
function getData() {
  superagent.get(baseUrl).end((err, res) => {
    // console.log(res.text)
    // resolve();
    let data = JSON.parse(res.text)
    // 1.获取到所有的分类类型
    // console.log(data.data.category.list);
    let list = data.data.category.list;
    ep.emit("category", list)
  });

  ep.after("category", 1, (data) => {
    // console.log(data[0].length);
    let subcategory = [];
    data[0].forEach((item) => {
      subcategory.push(`${baseUrl2}?maitKey=${item.maitKey}`)
    });

    // console.log(subcategory);
    subcategory.forEach((item) => {
      superagent.get(item).end((err, res) => {
        // console.log(res.text);
        let data = JSON.parse(res.text);
        // console.log(data);
        Subcategory.insertMany(data, () => {
          console.log("添加成功");
        })
      })
    })
  })

}

// module.exports = getData
getData()