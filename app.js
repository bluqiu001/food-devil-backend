const keys = require('./config');
const mongoose = require('mongoose');
const Restaurant = require('./models/restaurantSchema');
const Food = require('./models/foodSchema');
const Review = require('./models/reviewSchema');
const User = require('./models/userSchema');

mongoose
  .connect(keys.mongodb_srv)
  .then(() => console.log('Connected to database'))
  .catch((err) => console.log(err));

const userTest = new User({
  full_name: 'Ashabur Rahman',
  username: 'Test123-345',
  password: 'xyza',
});

userTest.save().then(() => console.log('Saved user'));
