var express = require("express");

var router = express.Router();

const bookMapper = (allBooks) => {
  //what shows to client when this api is called
  return allBooks.items.map((item) => ({
    bookId: item.id,
    bookTitle: item.volumeInfo.title,
    bookSubtitle: item.volumeInfo.subtitle,
    bookAuthors: item.volumeInfo.authors
      ? `by ${item.volumeInfo.authors}`
      : "No authors available",
    bookPublisher: item.volumeInfo.publisher
      ? `Published by: ${item.volumeInfo.publisher}`
      : "No publisher available",
    bookPublisherDate: item.volumeInfo.publisherDate
      ? `Published on: ${item.volumeInfo.publisherDate}`
      : " ",
    bookDescription: item.volumeInfo.description,
    // bookIsbnIdentifier: item.volumeInfo.industryIdentifiers[1].identifier,
    bookGenre: item.volumeInfo.categories
      ? `Genre: ${item.volumeInfo.categories}`
      : " ",
    bookAvgRating: item.volumeInfo.averageRating //conditional: if this has rating; store in bookAvgRating, else display string
      ? item.volumeInfo.averageRating
      : "Rating not available at this time",

    // check if thumbnail is null
    bookCover: item.volumeInfo.imageLinks.thumbnail
      ? item.volumeInfo.imageLinks.thumbnail
      : null,
  }));
};

/* GET external api - all books*/
router.get("/:page", function (req, res, next) {
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=search+terms&key=AIzaSyALGNX80FxfZ9U-oFQPyh0k8T1IgquZc1w&page=${
      req.params.page * 20
    }&startIndex=0&maxResults=20` //page starts at index 0, multiples by 20 and result is then current index (keeps multiplying by 20 when more is clicked in UI) - i.e 20 at a time
  )
    .then((response) => response.json()) //parsing to js object (changing to array)
    .then((allBooks) => {
      res.json(bookMapper(allBooks));
    }); // mapping json & the respond you send to the caller of your api
});

/* GET search specific book */
router.get("/search/:searchBook", function (req, res, next) {
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${req.params.searchBook}&key=AIzaSyALGNX80FxfZ9U-oFQPyh0k8T1IgquZc1w`
  )
    .then((response) => response.json()) //parsing to js object (changing to array)
    .then((allBooks) => {
      allBooks.items = allBooks.items ?? []; // if items is null; show empty array, else; show items

      res.json(bookMapper(allBooks));
    }); // mapping json & the respond you send to the caller of your api
});

module.exports = router;
