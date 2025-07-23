// backend/routes/abTestRoutes.js
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { variant } = req.body;
  console.log("A/B Test Submitted Variant:", variant);
  res.status(200).json({ message: "Submitted" });
});

module.exports = router;
