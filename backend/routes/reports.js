const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

// Filtered lead report
router.get('/', async (req, res) => {
  const { startDate, endDate, source } = req.query;

  const query = {};
  if (startDate && endDate) {
    query.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }
  if (source) {
    query.source = source;
  }

  try {
    const leads = await Lead.find(query);
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
