const mongoose = require("./db")
const Subcategory = mongoose.Schema({
  "data": Object,
}, { versionKey: false });

module.exports = mongoose.model("subcategory", Subcategory, "subcategory");