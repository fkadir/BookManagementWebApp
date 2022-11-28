var express = require("express");
var bcrypt = require("bcrypt");

var User = require("../model/user");
var resetRequest = require("../model/resetRequest");
var mongoose = require("mongoose");
var sendResetLink = require("./sendEmail");

var router = express.Router();

// code adapted from: https://github.com/coding-with-chaim/forgot-password-code/tree/master/auth/index.js

router.post("/forgot", (req, res, next) => {
  try {
    searchQuery = { email: req.query.email };

    User.find(searchQuery, function (err, userResult) {
      if (err) {
        res.status(400);
        res.send();
      }
      if (userResult.length > 0) {
        let newResetRequest = new resetRequest(searchQuery);
        newResetRequest._id = mongoose.Types.ObjectId();

        newResetRequest.save(function (err) {
          if (err) {
            console.log(err);
            res.status(400);
            res.send({ msg: "Link could not be send " });
          } else {
            sendResetLink(req.query.email, newResetRequest._id);

            res.status(200);
            res.send({ msg: "" });
          }
        });
      } else {
        res.send({ msg: "No account exists with this email" });
      }
    });
  } catch (error) {
    res.status(500);
  }
});

router.patch("/reset", (req, res, next) => {
  const thisRequest = req.body.id;

  // find reset request's email
  resetRequest.find(thisRequest, function (err, requestResult) {
    if (err) {
      res.status(400);
      res.send();
    }

    // update user's password by email
    var searchQuery = { email: requestResult[0].email };
    User.updateOne(
      searchQuery,
      { $set: { password: req.body.password } }, //
      function (err, updated) {
        if (err) {
          res.status(404);
          res.send({ msg: "Password could not be updated" });
        }
      }
    );
  });

  // delete reset request
  resetRequest.deleteOne(thisRequest, function (err, updated) {
    if (err) {
      res.status(400);
      res.send({ msg: "Request could not be completed" });
    }
    res.status(200);
    res.send({ msg: "" });
  });
});

module.exports = router;
