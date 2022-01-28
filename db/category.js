const mongoose = require("./db")
const Category = mongoose.Schema({
  "data": Object,
}, { versionKey: false });

module.exports = mongoose.model("category", Category, "category");