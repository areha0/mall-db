const mongoose = require("./db")
const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  password: {
    type: String
  },
  phone: String
}, { versionKey: false });

module.exports = mongoose.model("User", UserSchema, "user");