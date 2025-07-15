const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const redisClient = require('../utils/redisClient');
<<<<<<< Updated upstream

// POST /api/leads
=======
const sendLeadEmail = require('../utils/emailSender');

>>>>>>> Stashed changes
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
<<<<<<< Updated upstream
    const newLead = new Lead({ name, email, message });
=======
    const newLead = new Lead({ formTitle: 'Default', data: { name, email, message } });
>>>>>>> Stashed changes
    await newLead.save();

    if (redisClient.isReady) {
      await redisClient.set(`lead:${newLead._id}`, JSON.stringify(newLead), { EX: 3600 });
    }

<<<<<<< Updated upstream
    res.status(201).json({ success: true, message: 'Lead submitted successfully.' });
=======
    // Send nurturing email
    await sendLeadEmail({ name, email, message });

    res.status(201).json({ success: true, message: 'Lead submitted and email sent.' });
>>>>>>> Stashed changes
  } catch (error) {
    console.error('Lead submission error:', error);
    res.status(500).json({ success: false, message: 'Server error. Could not submit lead.' });
  }
});
<<<<<<< Updated upstream
router.get('/', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, leads });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not retrieve leads' });
  }
});
=======

>>>>>>> Stashed changes
module.exports = router;
