const jwt = require('jsonwebtoken');
const keys = require('../../config');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, keys.jwt_key);
    req.userData = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Auth failed', err: error });
  }
};
