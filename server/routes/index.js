var express = require("express");

var User = require("../model/user");
var MyBooks = require("../model/myBooks");
var mongoose = require("mongoose");

var router = express.Router();

/* GET home page. */
router.get("/:page", function (req, res, next) {
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=search+terms&key=AIzaSyALGNX80FxfZ9U-oFQPyh0k8T1IgquZc1w&page=${req.params.page}`
  )
    .then((response) => response.json()) //parsing to js object (changing to array)
    .then((allBooks) => {
      console.log(allBooks);
      res.json(
        //what shows to client when this api is called
        allBooks.items.map((item) => ({
          bookId: item.id,
          bookTitle: item.volumeInfo.title,
          bookSubtitle: item.volumeInfo.subtitle,
          bookAuthors: item.volumeInfo.authors,
          bookPublisher: item.volumeInfo.publisher,
          bookPublisherDate: item.volumeInfo.publisherDate,
          bookDescription: item.volumeInfo.description,
          // bookIsbnIdentifier: item.volumeInfo.industryIdentifiers[1].identifier,
          bookGenre: item.volumeInfo.categories,
          bookAvgRating: item.volumeInfo.averageRating,
          // ? item.volumeInfo.averageRating
          // : "Rating not available at this time",

          // check if thumbnail is null
          bookcover: item.volumeInfo.imageLinks.thumbnail
            ? item.volumeInfo.imageLinks.thumbnail
            : null,
        }))
      );
    }); // mapping json & the respond you send to the caller of your api
});

module.exports = router;
