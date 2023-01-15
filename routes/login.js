const router = require("express").Router();
const { loginValidation } = require("../validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSignup = require("../models/UserSignup");

router.post("/login", async (req, res) => {
  // Validation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // ====  Checking For Email and Password is Exist in the DB
  // Find EMAIL from UserSignup Collection in the DB
  const user = await UserSignup.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: "ایمیل وجود ندارد!" });

  // PASSWORD IS CORRECT
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ message: "رمز عبور نامعتبر است!" });

  // create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).json({
    name: user.name,
    email: user.email,
    _id: user._id,
    token: token,
    password: user.password,
  });
});

module.exports = router;
