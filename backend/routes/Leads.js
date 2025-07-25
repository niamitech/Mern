// backend/routes/leads.js

const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead'); // Your Mongoose model

router.get('/', async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching leads' });
  }
});

module.exports = router;
