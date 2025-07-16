const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  source: { type: String, default: 'Website' },
  createdAt: { type: Date, default: Date.now },
  score: { type: Number, default: 0 }
});

module.exports = mongoose.model('Lead', leadSchema);
