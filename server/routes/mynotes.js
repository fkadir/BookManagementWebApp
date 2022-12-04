var express = require("express");
var MyNotes = require("../model/notes");
var mongoose = require("mongoose");
var router = express.Router();

// get my notes per user and book
router.get("/", function (req, res, next) {
  let searchQuery = {};

  try {
    if (req.query.user && req.query.book) {
      searchQuery = { userId: req.query.user, bookDataId: req.query.book };
    }

    MyNotes.find(searchQuery, function (err, result) {
      if (result.length === 0) res.send({ msg: "newNote" });
      else {
        res.send({ notes: result[0].notes, msg: "" });
      }
    });
  } catch (error) {
    res.status(404).json({ msg: "notes could not be found" });
  }
});

//append notes per user and book
router.post("/", function (req, res, next) {
  let newNotes = new MyNotes(req.body);
  newNotes._id = mongoose.Types.ObjectId();

  newNotes.save(function (err) {
    if (err) {
      console.log(err);
      res.status(400);
      res.send();
    } else {
      console.log("saved!");
      res.send({ id: newNotes._id });
    }
  });
});

//update notes per user and book
router.patch("/", function (req, res, next) {
  let searchQuery = {};

  try {
    if (req.query.user && req.query.book) {
      searchQuery = { userId: req.query.user, bookDataId: req.query.book };
    }

    MyNotes.updateOne(searchQuery, { $set: req.body }, function (err, updated) {
      if (err) {
        res.status(400);
        res.send();
      }
      res.send(updated);
    });
  } catch (error) {
    res.status(404).json({ msg: "notes could not be updated" });
  }
});

module.exports = router;
