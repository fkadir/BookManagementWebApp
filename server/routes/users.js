var express = require("express");
var User = require("../model/user");
var router = express.Router();

/* get all users */
router.get("/", function (req, res, next) {});

/* create new user*/
router.post("/", function (req, res, next) {});

/* update user*/
// or put?
router.patch("/", function (req, res, next) {});

/* delete user*/
router.post("/", function (req, res, next) {});

module.exports = router;
