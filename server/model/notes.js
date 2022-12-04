var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Define a schema.
var notesSchema = new Schema({
  userId: String,
  bookDataId: String,
  notes: String,
});

// Create a model.
var MyNotes = mongoose.model("MyNotes", notesSchema);

module.exports = MyNotes;
