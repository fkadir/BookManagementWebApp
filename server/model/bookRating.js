var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Define a schema.
var bookRatingSchema = new Schema({
  bookDataId: String,
  ratings: Array,
});

// Create a model.
var BookRating = mongoose.model("BookRating", bookRatingSchema);

module.exports = BookRating;
