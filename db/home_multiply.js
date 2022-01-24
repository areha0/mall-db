const mongoose = require("./db")
const Home_multiply = mongoose.Schema({
  "data": Object,
}, { versionKey: false });

module.exports = mongoose.model("home_multiply", Home_multiply, "home_multiply");