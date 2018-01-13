const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
    bcrypt: true,
  },
  name: String,
});

const User = mongoose.model('User', UserSchema)

module.exports = User;
