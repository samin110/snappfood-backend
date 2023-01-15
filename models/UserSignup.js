const mongoose = require("mongoose");

const userSignupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 8,
    max: 255,
  },
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
  confirmPassword: {
    type: String,
    require: true,
    min: 8,
    max: 256,
  },
});

module.exports = mongoose.model("userSignup", userSignupSchema);
