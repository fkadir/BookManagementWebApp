const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createJWT } = require("./createJWT");

// adapted code from:https://medium.com/swlh/user-authentication-using-mern-stack-part-1-backend-cd4d193f15b1

exports.login = (req, res) => {
  // Check if the user exists or not, if user not exists, throw errors with the message user not found.
  let { username, password } = req.body;
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: "username or password not correct" }] });
      } else {
        // If the user exists, we are checking whether the assigned and retrieved passwords are the same or not using the bcrypt.compare() method.
        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            if (!isMatch) {
              return res
                .status(400)
                .json({ errors: [{ msg: "username or password incorrect" }] });
            }
            //Sign our jwt and set the JWT token expiration time. Token will be expired within the defined duration which is 1hr in our current code.
            let access_token = createJWT(user.username, user._id, 3600);
            jwt.verify(
              access_token,
              process.env.TOKEN_SECRET,
              (err, decoded) => {
                if (err) {
                  res.status(500).json({ erros: err });
                }
                //If succeed send the token in our response with success status(200) and user information.
                if (decoded) {
                  console.log(access_token);
                  return res.status(200).json({
                    success: true,
                    token: access_token,
                    message: user,
                  });
                }
              }
            );
          })
          .catch((err) => {
            res.status(500).json({ erros: err });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ erros: err });
    });
};
