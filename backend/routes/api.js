const express = require('express');
const router = express.Router();

router.get('/data', (req, res) => {
  res.json({
    message: "This is your protected data!",
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
