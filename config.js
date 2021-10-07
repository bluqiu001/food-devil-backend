require('dotenv').config();

module.exports = {
  mongodb_srv: process.env.MONGODB_SRV,
};

console.log(process.env.MONGODB_SRV); 
