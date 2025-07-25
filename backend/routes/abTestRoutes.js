const express = require("express");
const router = express.Router();
const AbTest = require("../models/AbTest");

// Record views or basic actions
router.post("/", async (req, res) => {
  const { variant, action } = req.body;
  if (!variant || !action) {
    return res.status(400).json({ error: "variant and action required" });
  }
  try {
    await new AbTest({ variant, action }).save();
    res.status(201).json({ message: `Recorded action ${action} for variant ${variant}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to record action" });
  }
});

// Handle actual form submission
router.post("/submit", async (req, res) => {
  const { formVersion, name, email } = req.body;
  if (!formVersion || !name || !email) {
    return res.status(400).json({ error: "formVersion, name, and email are required" });
  }
  try {
    await new AbTest({ variant: formVersion, action: "submit" }).save();
    res.status(201).json({ message: "Form submission recorded" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to record submission" });
  }
});

// Analytics endpoint
router.get("/analytics", async (req, res) => {
  try {
    const variants = ["A", "B"];
    const results = await Promise.all(
      variants.map(async (v) => {
        const impressions = await AbTest.countDocuments({ variant: v, action: "view" });
        const submissions = await AbTest.countDocuments({ variant: v, action: "submit" });
        return {
          variant: v,
          impressions,
          submissions,
          conversionRate: impressions > 0 ? submissions / impressions : 0
        };
      })
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

module.exports = router;
