const mongoose = require("mongoose");

const abTestSchema = new mongoose.Schema({
  variant: {
    type: String,
    enum: ["A", "B"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AbTest", abTestSchema);
