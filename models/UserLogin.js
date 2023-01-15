const mongoose = require("mongoose");

const userLoginSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    min: 8,
    max: 255,
  },
  password: {
    type: String,
    require: true,
    min: 8,
    max: 256,
  },
});

module.exports = mongoose.model("UserLogin", userLoginSchema);
