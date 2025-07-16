const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

router.post('/', async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    await newLead.save();
    res.status(201).json({ message: 'Lead saved successfully' });
  } catch (err) {
    console.error('Lead submission error:', err);
    res.status(400).json({ message: 'Failed to save lead', error: err });
  }
});

module.exports = router;
