const jwt = require("jsonwebtoken");

//Verify Token Function
module.exports = function (req, res, next) {
  const token = req.header("auth-token"); // return token
  if (!token) return res.status(401).send("دسترسی ممکن نیست");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET); // return payload in jwt
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("توکن نامعتبر است");
  }
};
