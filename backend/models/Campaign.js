const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  source: { type: String, required: true }, // e.g. Facebook, Twitter, Instagram
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  clicks: { type: Number, default: 0 },
  impressions: { type: Number, default: 0 },
  leadsGenerated: { type: Number, default: 0 },
  leads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lead' }] // link leads
});

module.exports = mongoose.model('Campaign', campaignSchema);
