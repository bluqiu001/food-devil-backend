require('dotenv').config();

module.exports = {
  mongodb_srv: process.env.MONGODB_SRV,
  jwt_key: process.env.JWT_KEY,
};
