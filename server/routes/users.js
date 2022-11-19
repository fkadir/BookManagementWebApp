var express = require("express");
var User = require("../model/user");
var router = express.Router();

/* get all users */
router.get("/users", function (req, res, next) {
  let searchQuery = {};

  if (req.query.name) searchQuery = { name: req.query.name };

  User.find(searchQuery, function (err, users) {
    if (err) {
      res.status(400);
      res.send();
    }

    console.log("returning all the users.");
    res.send(users);
  });
});

/* create new user*/
router.post("/", function (req, res, next) {});

/* update user*/
// or put?
router.patch("/", function (req, res, next) {});

/* delete user*/
router.post("/", function (req, res, next) {});

module.exports = router;
