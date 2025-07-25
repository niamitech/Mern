const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: false },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  activityCount: { type: Number, default: 1 },
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' }, // new
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', leadSchema);
