var express = require("express");
var bcrypt = require("bcrypt");

var User = require("../model/user");
var resetRequest = require("../model/resetRequest");
var mongoose = require("mongoose");
var sendResetLink = require("./sendEmail");

var router = express.Router();

// code adapted from: https://github.com/coding-with-chaim/forgot-password-code/tree/master/auth

router.post("/forgot", (req, res) => {
  try {
    userEmail = req.query.email;
    searchQuery = { email: userEmail };

    User.find(searchQuery, function (err, userResult) {
      if (err) {
        res.status(400);
        res.send();
      }
      let newResetRequest = new resetRequest({ email: userEmail });
      newResetRequest._id = mongoose.Types.ObjectId();

      newResetRequest.save(function (err) {
        if (err) {
          console.log("reset request not created!");
          res.status(400);
          res.send();
        } else {
          console.log("reset request created!");
          res.send({ id: newResetRequest._id });
        }
      });
      sendResetLink(userEmail, newResetRequest._id);
    });

    res.status(200);
  } catch (error) {
    res.status(500);
  }
});

// yet to be adapted:
// router.patch("/reset", (req, res) => {
//   const thisRequest = getResetRequest(req.body.id);
//   if (thisRequest) {
//     const user = getUser(thisRequest.email);
//     bcrypt.hash(req.body.password, 10).then((hashed) => {
//       user.password = hashed;
//       updateUser(user);
//       res.status(204).json();
//     });
//   } else {
//     res.status(404).json();
//   }
// });

module.exports = router;
