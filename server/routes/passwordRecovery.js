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
            res.status(400);
            res.send({ msg: "Link could not be send " });
          } else {
            console.log("reset request created!");
            // sendResetLink(req.query.email, newResetRequest._id);
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
