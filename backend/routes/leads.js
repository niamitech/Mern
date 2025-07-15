const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const sendLeadEmail = require('../utils/emailSender');
const redisClient = require('../utils/redisClient');

// POST /api/leads
router.post('/', async (req, res) => {
  const { name, email, phone, message, source } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required.' });
  }

  try {
    const newLead = new Lead({
      name,
      email,
      phone,
      message,
      source: source || 'Website',
    });

    await newLead.save();

    if (redisClient.isReady) {
      await redisClient.set(`lead:${newLead._id}`, JSON.stringify(newLead), { EX: 3600 });
    }

    await sendLeadEmail({ name, email, message });

    res.status(201).json({ success: true, message: 'Lead submitted and email sent.' });
  } catch (error) {
    console.error('Lead submission error:', error);
    res.status(500).json({ success: false, message: 'Server error. Could not submit lead.' });
  }
});

module.exports = router;
