const mongoose = require("./db")
const Detail_data = mongoose.Schema({
  "result": Object,
}, { versionKey: false });

module.exports = mongoose.model("detail_data", Detail_data, "detail_data");