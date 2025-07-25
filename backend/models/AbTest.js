const mongoose = require("mongoose");

const abTestSchema = new mongoose.Schema({
  variant: { type: String, required: true },      // "A" or "B"
  action: { type: String, required: true },       // "view" or "submit"
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AbTest", abTestSchema);
