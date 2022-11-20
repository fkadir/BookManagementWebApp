var express = require("express");
var User = require("../model/user");
var mongoose = require("mongoose");
var router = express.Router();

/* get all users */
router.get("/", function (req, res, next) {
  console.log("arrived-get");
  res.json({ mssg: "GET all users" });
});

/* create new user*/
router.post("/", function (req, res, next) {
  console.log("arrived-post");
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
// or put?
router.patch("/", function (req, res, next) {
  console.log("arrived-patch");
  res.json({ mssg: "UPDATE user" });
});

/* delete user*/
router.delete("/", function (req, res, next) {
  console.log("arrived-post");
  res.json({ mssg: "DELETE user" });
});

module.exports = router;

// https://github.com/paul-kelly-dit/web-application-architecture/blob/master/mongo/mern-backend/routes/index.js
