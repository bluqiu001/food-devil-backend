const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  username: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9_.-]*$/,
  },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
