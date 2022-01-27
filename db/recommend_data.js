const mongoose = require("./db")
const Recommend = mongoose.Schema({
  "data": Object,
}, { versionKey: false });

module.exports = mongoose.model("recommend", Recommend, "recommend");