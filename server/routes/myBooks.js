var express = require("express");
var MyBooks = require("../model/myBooks");
var mongoose = require("mongoose");
var router = express.Router();

/*get my books*/
router.get("/", function (req, res, next) {
  let searchQuery = {};

  // filter mybooks by author, title or status
  if (req.query.title) searchQuery = { title: req.query.title };
  if (req.query.author) searchQuery = { author: req.query.author };
  if (req.query.status) searchQuery = { status: req.query.status };

  MyBooks.find(searchQuery, function (err, mybooks) {
    if (err) {
      res.status(400);
      res.send();
    }

    console.log("returning my books.");
    res.send(mybooks);
  });
});

/*add to my books*/
router.post("/", function (req, res, next) {
  //in the req.body all input fields need to be specified (including title, author and ID from external API)
  let newMyBook = new MyBooks(req.body);
  newMyBook._id = mongoose.Types.ObjectId();

  newMyBook.save(function (err) {
    if (err) {
      console.log("not saved!");
      res.status(400);
      res.send();
    } else {
      console.log("saved!");
      res.send({ id: newMyBook._id });
    }
  });
});

/*update my books*/
router.patch("/", function (req, res, next) {
  let searchQuery = {};

  // determine the book by MyBooks_id
  if (req.query.id) searchQuery = { _id: req.query.id };

  MyBooks.updateOne(searchQuery, { $set: req.body }, function (err, updated) {
    if (err) {
      res.status(400);
      res.send();
    }
    res.send(updated);
  });
});

/*delete from my books */
router.delete("/", function (req, res, next) {
  let searchQuery = {};

  //determine book my MyBooks_id
  if (req.query.id) searchQuery = { _id: req.query.id };

  MyBooks.deleteOne(searchQuery, function (err, deleted) {
    if (err) {
      res.status(400);
      res.send();
    }
    res.send(deleted);
  });
});

module.exports = router;
