var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Define a schema.
var myBooksSchema = new Schema({
  bookDataId: String,
  status: String,
  rating: Number,
});

// Create a model.
var MyBooks = mongoose.model("MyBooks", myBooksSchema);

module.exports = MyBooks;
