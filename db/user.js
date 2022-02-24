const mongoose = require("./db")
const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  password: {
    type: String
  },
  phone: String,
  searchHistory: Array,
  addressList: Array,
}, { versionKey: false });

module.exports = mongoose.model("User", UserSchema, "user");