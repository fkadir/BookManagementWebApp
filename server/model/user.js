var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Define a schema.
var userSchema = new Schema({
  username: String,
  password: String,
  email: String,
});

// Create a model.
var User = mongoose.model("User", userSchema);

module.exports = User;
