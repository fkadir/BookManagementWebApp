var express = require("express");

var User = require("../model/user");
var MyBooks = require("../model/myBooks");
var BookRating = require("../model/bookRating");
var mongoose = require("mongoose");

var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
