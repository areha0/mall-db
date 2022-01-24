const mongoose = require("./db")
const UserSchema = mongoose.Schema({
  username: String,
  state: Number,
  id: String,
  image: String,
  title: String,
  desc: String,
  price: String,
  count: Number,
  checked: Boolean

}, { versionKey: false });

module.exports = mongoose.model("Shopcart", UserSchema, "shopcart");