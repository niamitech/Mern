const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  activityCount: { type: Number, default: 1 },
  name: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', LeadSchema);
