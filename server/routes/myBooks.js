var express = require("express");
var MyBooks = require("../model/myBooks");
var mongoose = require("mongoose");
var router = express.Router();

/*get my books for all users or specific user*/
router.get("/", function (req, res, next) {
  let searchQuery = {};

  // filter mybooks by user, author, title and/or status
  if (req.query.title)
    searchQuery = {
      userId: req.query.user,
      title: { $regex: req.query.title, $options: "i" }, // i to ignore upper/lower cases, & regex is pattern matching in query for title; so user can search for a book
    };
  else if (req.query.author)
    searchQuery = { userId: req.query.user, author: req.query.author };
  else if (req.query.status)
    searchQuery = { userId: req.query.user, status: req.query.status };
  else if (req.query.user) searchQuery = { userId: req.query.user };

  MyBooks.find(searchQuery, function (err, mybooks) {
    if (err) {
      res.status(400);
      res.send();
    }

    res.send(
      mybooks.map((item) => ({
        id: item._id,
        userId: item.userId,
        bookId: item.bookDataId,
        bookTitle: item.title,
        bookAuthors: item.author,
        bookAvgRating: item.rating,
        bookStatus: item.status,
        bookCover: item.cover,
        bookSubtitle: item.subtitle,
        bookDescription: item.description,
      }))
    );
  });
});

/*add to my books*/
router.post("/", function (req, res, next) {
  const searchQuery = {
    userId: req.body.userId,
    bookDataId: req.body.bookDataId,
  };

  // checking if book is already in "my books" (so no duplication is made in my books)
  MyBooks.findOne(searchQuery, function (err, myBook) {
    if (err) {
      res.status(400);
      res.send();
    }

    if (myBook) {
      MyBooks.updateOne(
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
    } else {
      console.log("create book");
      //in the req.body all input fields need to be specified (including title, author and ID from external API)
      let newMyBook = new MyBooks(req.body);
      newMyBook._id = mongoose.Types.ObjectId();

      newMyBook.save(function (err) {
        if (err) {
          console.log("not saved!");
          console.error(err);
          res.status(400);
          res.send();
        } else {
          console.log("saved!");
          res.send({ id: newMyBook._id });
        }
      });
    }
  });
});

/*update my books*/
router.patch("/", function (req, res, next) {
  let searchQuery = {};

  // determine the book by MyBooks_id
  if (req.query.id) searchQuery = { _id: req.query.id };

  //in the req.body all to be changed fields need to be specified
  MyBooks.updateOne(searchQuery, { $set: req.body }, function (err, updated) {
    if (err) {
      res.status(400);
      res.send();
    }
    res.send(updated);
  });
});

/*delete from my books */
router.delete("/:id", function (req, res, next) {
  let searchQuery = {};

  searchQuery = { _id: req.params.id };

  MyBooks.deleteOne(searchQuery, function (err, deleted) {
    if (err) {
      res.status(400);
      res.send();
    }
    res.send(deleted);
  });
});

module.exports = router;
