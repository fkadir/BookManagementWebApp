const User = require("../model/user");
const jwt = require("jsonwebtoken");

exports.verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err)
        return res.json({ isLoggedIn: false, msg: "Failed to authenticate" });
      req.user = {};
      req.user.id = decoded.id;
      req.user.username = decoded.username;
      next();
    });
  } else {
    res.json({ msg: "Incorrect token given", isLogeddIn: false });
  }
};
