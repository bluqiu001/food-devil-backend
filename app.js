const keys = require('./config');
const mongoose = require('mongoose');
const Restaurant = require('./models/restaurantSchema');
const Food = require('./models/foodSchema');
const Review = require('./models/reviewSchema');
const User = require('./models/userSchema');
const Meal = require('./models/mealSchema');

mongoose
  .connect(keys.mongodb_srv)
  .then(() => console.log('Connected to database'))
  .catch((err) => console.log(err));

/**const userTest = new User({
  full_name: 'Ashabur Rahman',
  username: 'Test123-345',
  password: 'xyza',
});

userTest.save().then(() => console.log('Saved user'));
**/

const mealTest = new Meal({
  user_id: 'testtest',
  foods: ['615e25ee7a51ba6ed79c9b02', '615e25ee7a51ba6ed79c9b02']
});

mealTest.save().then(() => console.log('Saved meal'));