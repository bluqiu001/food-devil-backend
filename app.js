const keys = require('./config');
const mongoose = require('mongoose');
<<<<<<< HEAD
const Cat = require('./models/catSchema');
const User = require('./models/userSchema');

//^Imports

const Restaurant = require('./models/restaurantSchema');

mongoose
  .connect(keys.mongodb_srv)
  .then(() => console.log('Connected to database'))
  .catch((err) => console.log(err));

<<<<<<< HEAD
//Create a new cat object called kitty
const kitty = new Cat({ name: 'Peter', color: 'Blue' });
const user = new User({first_name: 'Jerry', last_name: 'Lin', username: 'jerrylin'})

//Save and upload this object to the collection of cats then print meow
kitty.save().then(() => console.log('meow'));
user.save().then(() => console.log('meow'));

=======
const restaurantTest = new Restaurant({ name: 'Tandoor', location: 'WU1' });

restaurantTest.save().then(() => console.log('Saved restaurant'));
