const mongoose = require("./db")
const Category_one = mongoose.Schema({
  "data": Object,
}, { versionKey: false });

module.exports = mongoose.model("category_one", Category_one, "category_one");