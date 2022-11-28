var express = require("express");
var User = require("../model/user");
var mongoose = require("mongoose");
var router = express.Router();

// get and post methoddss
// https://github.com/paul-kelly-dit/web-application-architecture/blob/master/mongo/mern-backend/routes/index.js

/* get users */
router.get("/", function (req, res, next) {
  let searchQuery = {};

  //filter users by username or email
  if (req.query.username) searchQuery = { username: req.query.username };
  if (req.query.email) searchQuery = { email: req.query.email };
  if (req.query.id) searchQuery = { _id: req.query.id };

  User.find(searchQuery, function (err, users) {
    if (err) {
      res.status(400);
      res.send();
    }
    res.send(users);
  });
});

/* create new user*/
router.post("/", function (req, res, next) {
  let newUser = new User(req.body);
  newUser._id = mongoose.Types.ObjectId();

  newUser.save(function (err) {
    if (err) {
      console.log("not saved!");
      res.status(400);
      res.send();
    } else {
      console.log("saved!");
      res.send({ id: newUser._id });
    }
  });
});

/* update user*/
router.patch("/", function (req, res, next) {
  let searchQuery = {};

  if (req.query.id) searchQuery = { _id: req.query.id };
  if (req.query.username) searchQuery = { username: req.query.username };

  User.updateOne(searchQuery, { $set: req.body }, function (err, updated) {
    if (err) {
      res.status(400);
      res.send();
    }
    res.send(updated);
  });
});

/* delete user*/
router.delete("/", function (req, res, next) {
  let searchQuery = {};

  if (req.query.id) searchQuery = { _id: req.query.id };

  User.deleteOne(searchQuery, function (err, updated) {
    if (err) {
      res.status(400);
      res.send();
    }
    res.send(updated);
  });
});

module.exports = router;
