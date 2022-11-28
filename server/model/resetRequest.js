var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var requestSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

// Create a model.
var resetRequest = mongoose.model("resetRequest", requestSchema);

module.exports = resetRequest;
