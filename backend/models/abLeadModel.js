const mongoose = require("mongoose");

const abLeadSchema = new mongoose.Schema({
  name: String,
  email: String,
  variant: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ABLead", abLeadSchema);
