const mongoose = require("./db")
const Home_goods = mongoose.Schema({
  "data": Object,
}, { versionKey: false });

module.exports = mongoose.model("home_goods", Home_goods, "home_goods");