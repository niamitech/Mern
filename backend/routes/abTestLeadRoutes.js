const express = require("express");
const router = express.Router();
const ABTestLead = require("../models/ABTestLead");

router.post("/submit", async (req, res) => {
  try {
    const lead = new ABTestLead(req.body);
    await lead.save();
    res.status(200).json({ message: "Lead submitted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const countA = await ABTestLead.countDocuments({ formVersion: "A" });
    const countB = await ABTestLead.countDocuments({ formVersion: "B" });

    res.json({ versionA: countA, versionB: countB });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
