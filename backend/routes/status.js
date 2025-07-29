// routes/status.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', async (req, res) => {
  const ts = Date.now();
  try {
    // Ping database
    await mongoose.connection.db.admin().ping();
    res.json({
      success: true,
      message: 'API is healthy',
      timestamp: ts
    });
  } catch (err) {
    console.error('Health check DB failed:', err);
    res.status(503).json({
      success: false,
      message: 'Database disconnected',
      timestamp: ts
    });
  }
});

module.exports = router;
