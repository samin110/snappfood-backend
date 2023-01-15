const router = require("express").Router();
const UserSignup = require("../models/UserSignup");
const { signupValidation } = require("../validation");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  // Validation Request before send
  const { error } = signupValidation(req.body);
  // Show Error
  if (error) return res.status(400).json({ message: error.details[0].message });

  // checking if the email user is already in the DB
  const emailExist = await UserSignup.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).json({ message: "ایمیل وارد شده تکراری است!" });

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create new user and send to DB
  const user = new UserSignup({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    confirmPassword: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
