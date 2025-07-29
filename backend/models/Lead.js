// backend/models/Lead.js
const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  status: { type: String, enum: ['new', 'contacted', 'converted', 'lost'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', leadSchema);
