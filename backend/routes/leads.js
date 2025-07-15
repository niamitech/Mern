const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const sendLeadEmail = require('../utils/emailSender');

// @route   POST /api/leads
// @desc    Submit a lead and send email
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    const newLead = new Lead({
      formTitle: 'Default',
      data: { name, email, message }
    });

    await newLead.save();

    // Redis is disabled


    await sendLeadEmail({ name, email, message });

    res.status(201).json({ success: true, message: 'Lead submitted and email sent.' });
  } catch (error) {
    console.error('Lead submission error:', error);
    res.status(500).json({ success: false, message: 'Server error. Could not submit lead.' });
  }
});

// Optional: GET /api/leads - View all leads
router.get('/', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, leads });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not retrieve leads' });
  }
});

module.exports = router;
