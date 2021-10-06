const keys = require('./config');
const mongoose = require('mongoose');
const Restaurant = require('./models/restaurantSchema');

mongoose
  .connect(keys.mongodb_srv)
  .then(() => console.log('Connected to database'))
  .catch((err) => console.log(err));

const restaurantTest = new Restaurant({ name: 'Tandoor', location: 'WU1' });

restaurantTest.save().then(() => console.log('Saved restaurant'));
