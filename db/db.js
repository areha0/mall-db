const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/mall", (err, result) => {
  if (err) {
    console.log(err);
    return
  };
  console.log("θΏζ₯ζε");
});

module.exports = mongoose;