var express = require("express");
var User = require("../model/user");
var mongoose = require("mongoose");
var router = express.Router();
const bcrypt = require("bcrypt");
const { login } = require("../controllers/auth");
const { verifyJWT } = require("../controllers/verifyJWT");

// get and post methods
// https://github.com/paul-kelly-dit/web-application-architecture/blob/master/mongo/mern-backend/routes/index.js

//code adapted from: https://dev.to/salarc123/mern-stack-authentication-tutorial-part-1-the-backend-1c57
router.get("/isUserAuth", verifyJWT, (req, res, next) => {
  res.json({ isLoggedIn: true, username: req.user.username });
});

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

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      if (err) throw err;
      newUser.password = hash;
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
  });
});

//code adapted from :https://medium.com/swlh/user-authentication-using-mern-stack-part-1-backend-cd4d193f15b1
router.post("/login", login);

/* update user*/
router.patch("/", function (req, res, next) {
  let searchQuery = {};

  if (req.query.username) searchQuery = { username: req.query.username };

  if (req.body.password) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        if (err) throw err;
        req.body.password = hash;
        User.updateOne(
          searchQuery,
          { $set: req.body },
          function (err, updated) {
            if (err) {
              res.status(400);
              res.send();
            }
            res.send(updated);
          }
        );
      });
    });
  } else {
    User.updateOne(searchQuery, { $set: req.body }, function (err, updated) {
      if (err) {
        res.status(400);
        res.send();
      }
      res.send(updated);
    });
  }
});

/* delete user*/
router.delete("/", function (req, res, next) {
  let searchQuery = {};

  if (req.query.username) searchQuery = { username: req.query.username };

  User.deleteOne(searchQuery, function (err, updated) {
    if (err) {
      res.status(400);
      res.send();
    }
    res.send(updated);
  });
});

module.exports = router;
