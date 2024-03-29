var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Define a schema.
var myBooksSchema = new Schema({
  userId: String,
  bookDataId: String,
  title: String,
  author: Array,
  status: String,
  rating: String,
  notes: String,
  cover: String,
  subtitle: String,
  description: String,
});

// Create a model.
var MyBooks = mongoose.model("MyBooks", myBooksSchema);

module.exports = MyBooks;
