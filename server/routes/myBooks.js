var express = require("express");
var MyBooks = require("../model/myBooks");
var mongoose = require("mongoose");
var router = express.Router();

/*get my books*/
router.get("/", function (req, res, next) {
  console.log("arrived-get");
  res.json({ mssg: "GET my books" });
});

/*add to my books*/
router.post("/", function (req, res, next) {
  console.log("arrived-post");
  res.json({ mssg: "ADD book to my books" });
});

/*update my books*/
router.patch("/", function (req, res, next) {
  console.log("arrived-patch");
  res.json({ mssg: "UPDATE my books" });
});

/*delete from my books */
router.delete("/", function (req, res, next) {
  console.log("arrived-delete");
  res.json({ mssg: "DELETE book from my books" });
});

module.exports = router;
