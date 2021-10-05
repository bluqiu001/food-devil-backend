require('dotenv').config();
const mongoose = require('mongoose');
const Cat = require('./models/catSchema');

mongoose
  .connect(process.env.MONGODB_SRV)
  .then(() => console.log('Connected to database'))
  .catch((err) => console.log(err));

const kitty = new Cat({ name: 'Peter' });
kitty.save().then(() => console.log('meow'));
