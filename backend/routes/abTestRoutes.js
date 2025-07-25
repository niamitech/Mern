const express = require("express");
const router = express.Router();

// (Optional) If saving to MongoDB
// const AbTest = require("../models/AbTest");

router.post("/", async (req, res) => {
  const { variant } = req.body;

  if (!variant || (variant !== "A" && variant !== "B")) {
    return res.status(400).json({ error: "Invalid variant" });
  }

  // If you want to store it in the DB:
  // const newEntry = new AbTest({ variant });
  // await newEntry.save();

  console.log("✅ Variant received:", variant);
  res.status(200).json({ message: "Variant received" });
});

module.exports = router;
