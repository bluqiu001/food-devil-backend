//Imports mongoose to the file
const mongoose = require('mongoose');

//Create cat schema
const catSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: String,
});

//Create a model using the cat schema
const Cat = mongoose.model('Cat', catSchema);

//Export the model for creating Cat objects
module.exports = Cat;
