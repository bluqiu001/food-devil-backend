const http = require('http');
const app = require('./app');
const keys = require('./config');
const mongoose = require('mongoose');

mongoose
  .connect(keys.mongodb_srv)
  .then(() => console.log('Connected to database'))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);
