const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true }, // store hashed password
  consent: { type: Boolean, required: true },
});

module.exports = mongoose.model('User', UserSchema);
