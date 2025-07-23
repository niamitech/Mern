const mongoose = require("mongoose");

const abTestLeadSchema = new mongoose.Schema({
  name: String,
  email: String,
  source: String,
  formVersion: String, // "A" or "B"
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ABTestLead", abTestLeadSchema);
