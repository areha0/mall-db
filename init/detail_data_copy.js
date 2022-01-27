// 获取详情页面的数据, 根据iid进行获取
// http://152.136.185.210:7878/api/hy66/detail?iid=1m70y5k
const Detail_data = require("../db/detail_data");
const superagent = require('superagent');
const eventproxy = require("eventproxy")

let baseUrl = "http://152.136.185.210:7878/api/hy66/home/data";
let detailUrl = "http://152.136.185.210:7878/api/hy66/detail";

let ep = new eventproxy();

function getData() {
  let typeArr = ["sell", "new", "pop"];
  let urlArr = [];
  let pageLength = 20;
  // 1. 获取主界面所有的商品信息--目的是为了获取商品的iid
  for (let i = 0; i < typeArr.length; i++) {
    for (let j = 1; j <= pageLength; j++) {
      urlArr.push(`${baseUrl}?type=${typeArr[i]}&page=${j}`)
    }
  };

  // console.log(urlArr);
  // 'http://152.136.185.210:7878/api/hy66/home/data?type=sell&page=1',
  // 2.urlArr是根据商品类型和页码所获取的url地址 -- 共有60个
  urlArr.forEach((item) => {
    superagent.get(item).end((err, res) => {
      // console.log(res.text);
      ep.emit("listArr", res.text)
    })
  });
  // console.log(urlArr.length);
  // 3. listArr是所有商品的粗略信息,目的是为了获取相应商品的id
  ep.after("listArr", urlArr.length, (data) => {
    // console.log(data.length);
    let listArr = [];
    data.forEach((item) => {
      let item1 = JSON.parse(item);
      let list = item1.data.list;
      listArr.push(...list);
    })
    // console.log(listArr.length);
    // 共计930条数据

    // iidArr是为了获取所有商品的iid,并且根据iid获取具体的商品数据
    // 'http://152.136.185.210:7878/api/hy66/detail?iid=1lsk6b8',
    let iidArr = [];
    listArr.forEach(item => {
      iidArr.push(`${detailUrl}?iid=${item.iid}`)
    });
    // console.log(iidArr.length);
    // 共计930
    // 只请求400个试试

    // 接下来就需要根据iidArr中的地址获取响应的数据
    for (let i = 0; i < iidArr.length; i++) {
      setTimeout(() => {
        superagent.get(iidArr[i]).end((err, res) => {
          let data = (res && res.text) ? res.text : JSON.stringify({});
          // console.log(data);
          // ep.emit("result", data);
          let result = JSON.parse(data);
          Detail_data.insertMany(result, () => {
            console.log("添加成功");
          })
        })
      }, i * 60);
    };


    // ep.after("result", iidArr.length, (data) => {
    //   // let res = JSON.parse(data);
    //   console.log(data);
    //   console.log(123);
    //   // 11833  1m7i4za
    //   Detail_data.insertMany(data, () => {
    //     console.log("添加成功");
    //   })
    // });

  })
}


getData()


