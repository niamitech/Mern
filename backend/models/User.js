const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  is2FAEnabled: { type: Boolean, default: false },
  twoFASecret: String,
});

module.exports = mongoose.model('User', userSchema);
