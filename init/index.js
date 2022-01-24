// 将所有数据存入数据库
const process = require("process");
const Home_multiply = require('./home_multiply');
const Home_goods = require("./home_goods");

(async () => {
  await Home_multiply();
  await Home_goods();
  console.log(123);
  process.on('exit', () => {
    console.log(`数据抓取完毕`);
  });
  process.exit()
})()



