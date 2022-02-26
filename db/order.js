const mongoose = require("./db")
const OrderSchema = mongoose.Schema({
  order: Array,
  state: Number
}, { versionKey: false });

module.exports = mongoose.model("order", OrderSchema, "order");