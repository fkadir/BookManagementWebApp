var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var requestSchema = new Schema({
  email: String,
});

// Create a model.
var resetRequest = mongoose.model("resetRequest", requestSchema);

module.exports = resetRequest;
