require('dotenv').config();
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_SRV)
  .then(() => console.log('Connected to database'))
  .catch((err) => console.log(err));
