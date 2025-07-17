const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const sendEmail = require('../utils/sendEmail'); // if using SendGrid

// POST /api/leads - Create a lead with tags
router.post('/', async (req, res) => {
  try {
    const { name, email, source, tags } = req.body;

    // Simple lead scoring logic
    let score = 0;
    if (source === 'website') score += 10;
    if (source === 'ad') score += 5;

    const newLead = new Lead({
      name,
      email,
      source,
      score,
      tags // ✅ Now saving tags
    });

    await newLead.save();

    // Optional email notification
    await sendEmail(email, 'Thanks for your interest!', 'We’ll contact you soon.');

    res.status(201).json({ message: 'Lead saved and email sent', score, tags: newLead.tags });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/leads - Get all leads (with tags)
router.get('/', async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /api/leads/:id/tags - Add or update tags for a lead
router.patch('/:id/tags', async (req, res) => {
  try {
    const { tags } = req.body;
    const lead = await Lead.findByIdAndUpdate(req.params.id, { tags }, { new: true });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: 'Could not update tags' });
  }
});

module.exports = router;
