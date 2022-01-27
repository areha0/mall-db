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

  // 2.
  urlArr.forEach((item) => {
    superagent.get(item).end((err, res) => {
      // console.log(res.text);
      ep.emit("listArr", res.text)
    })
  });
  // console.log(urlArr.length);
  // 3.
  ep.after("listArr", urlArr.length, (data) => {
    // console.log(data.length);
    let listArr = [];
    data.forEach((item) => {
      let item1 = JSON.parse(item);
      let list = item1.data.list;
      listArr.push(list);
    })

    console.log(listArr.length);
    // let iidArr1 = [];
    // let iidArr2 = [];
    // let iidArr3 = [];
    // let iidArr4 = [];
    // let iidArr5 = [];
    // for (let i = 0; i < listArr.length / 10; i++) {
    //   listArr[i].forEach(item1 => {
    //     iidArr1.push(`${detailUrl}?iid=${item1.iid}`)
    //   })
    // };

    // console.log(iidArr1.length);
    // console.log(iidArr2);
    // console.log(iidArr3);
    // console.log(iidArr4);
    // console.log(iidArr5);

    // ////////
    // iidArr1.forEach(item2 => {
    //   superagent.get(item2).end((err2, res2) => {
    //     //
    //     ep.emit("detail1", res2.text || JSON.stringify({}));
    //   })
    // });

    // ep.after("detail1", iidArr1.length, (data2) => {
    //   console.log(123);
    //   let result = JSON.parse(data2)
    //   Detail_data.insertMany(result, () => {
    //     console.log("添加成功1");
    //   })
    // });

    // // ////////
    // for (let i = listArr.length / 5; i < 2 * listArr.length / 5; i++) {
    //   listArr[i].forEach(item1 => {
    //     iidArr2.push(`${detailUrl}?iid=${item1.iid}`)
    //   })
    // };
    // iidArr2.forEach(item2 => {
    //   superagent.get(item2).end((err2, res2) => {
    //     //
    //     ep.emit("detail2", res2.text || JSON.stringify({}));
    //   })
    // });

    // ep.after("detail2", iidArr2.length, (data) => {
    //   let result = JSON.parse(data)
    //   Detail_data.insertMany(result, () => {
    //     console.log("添加成功2");
    //   })
    // });

    // // ////////
    // for (let i = 2 * listArr.length / 5; i < 3 * listArr.length / 5; i++) {
    //   listArr[i].forEach(item1 => {
    //     iidArr3.push(`${detailUrl}?iid=${item1.iid}`)
    //   })
    // };
    // iidArr3.forEach(item2 => {
    //   superagent.get(item2).end((err2, res2) => {
    //     //
    //     ep.emit("detail3", res2.text || JSON.stringify({}));
    //   })
    // });

    // ep.after("detail3", iidArr3.length, (data) => {
    //   let result = JSON.parse(data)
    //   Detail_data.insertMany(result, () => {
    //     console.log("添加成功3");
    //   })
    // });

    // // ////////
    // for (let i = 3 * listArr.length / 5; i < 4 * listArr.length / 5; i++) {
    //   listArr[i].forEach(item1 => {
    //     iidArr4.push(`${detailUrl}?iid=${item1.iid}`)
    //   })
    // };
    // iidArr4.forEach(item2 => {
    //   superagent.get(item2).end((err2, res2) => {
    //     //
    //     ep.emit("detail4", res2.text || JSON.stringify({}));
    //   })
    // });

    // ep.after("detail4", iidArr4.length, (data) => {
    //   let result = JSON.parse(data)
    //   Detail_data.insertMany(result, () => {
    //     console.log("添加成功4");
    //   })
    // });

    // // ////////
    // for (let i = 4 * listArr.length / 5; i < listArr.length; i++) {
    //   listArr[i].forEach(item1 => {
    //     iidArr5.push(`${detailUrl}?iid=${item1.iid}`)
    //   })
    // };
    // iidArr5.forEach(item2 => {
    //   superagent.get(item2).end((err2, res2) => {
    //     //
    //     ep.emit("detail5", res2.text || JSON.stringify({}));
    //   })
    // });

    // ep.after("detail5", iidArr5.length, (data) => {
    //   let result = JSON.parse(data)
    //   Detail_data.insertMany(result, () => {
    //     console.log("添加成功5");
    //   })
    // });

  })
}


getData()


