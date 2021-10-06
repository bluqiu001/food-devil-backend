const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

//Export the model for creating Cat objects
module.exports = Restaurant;
