var express = require("express");
var bcrypt = require("bcrypt");

var User = require("../model/user");
var resetRequest = require("../model/resetRequest");
var mongoose = require("mongoose");
var sendResetLink = require("./sendEmail");

var router = express.Router();

// code adapted from: https://github.com/coding-with-chaim/forgot-password-code/tree/master/auth

router.post("/forgot", (req, res, next) => {
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
      // sendResetLink(userEmail, newResetRequest._id);
    });

    res.status(200);
  } catch (error) {
    res.status(500);
  }
});

router.patch("/reset", (req, res, next) => {
  const thisRequest = { _id: req.query.id };

  resetRequest.find(thisRequest, function (err, requestResult) {
    if (err) {
      res.status(400);
      res.send();
    }

    var searchQuery = { email: requestResult[0].email };
    User.updateOne(
      searchQuery,
      { $set: { password: "hello300" } }, //req.body.password
      function (err, updated) {
        if (err) {
          res.status(404);
          res.send();
        }
        res.send(updated);
      }
    );
  });
});

module.exports = router;
