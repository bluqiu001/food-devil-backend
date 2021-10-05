require('dotenv').config();
const mongoose = require('mongoose');
const Cat = require('./models/catSchema');
//^Imports

//Connect to mongo atlas
mongoose
  .connect(process.env.MONGODB_SRV)
  .then(() => console.log('Connected to database'))
  .catch((err) => console.log(err));

//Create a new cat object called kitty
const kitty = new Cat({ name: 'Peter', color: 'Blue' });

//Save and upload this object to the collection of cats then print meow
kitty.save().then(() => console.log('meow'));
