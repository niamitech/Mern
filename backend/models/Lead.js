const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String },
  source: { type: String, default: 'Website' }, // Could be: 'Website', 'Ad Campaign', 'Referral', etc.
  status: { type: String, enum: ['New', 'Contacted', 'Qualified', 'Converted'], default: 'New' },
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
