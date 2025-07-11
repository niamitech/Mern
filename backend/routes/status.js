// backend/routes/status.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running properly",
    timestamp: new Date()
  });
});

module.exports = router;
