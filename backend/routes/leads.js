const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

// Create new lead
router.post('/', async (req, res) => {
  try {
    const leadData = req.body;
    const score = leadData.email.includes('@gmail.com') ? 80 : 50;
    const newLead = new Lead({ ...leadData, score });
    await newLead.save();
    res.status(201).json({ message: 'Lead saved successfully', score });
  } catch (err) {
    console.error('Lead submission error:', err);
    res.status(400).json({ message: 'Failed to save lead', error: err });
  }
});

// Get all leads with search, sort, and pagination
router.get('/', async (req, res) => {
  const { search = '', sortBy = 'createdAt', page = 1, limit = 10 } = req.query;

  const query = {
    $or: [
      { name: new RegExp(search, 'i') },
      { email: new RegExp(search, 'i') },
      { source: new RegExp(search, 'i') }
    ]
  };

  const leads = await Lead.find(query)
    .sort({ [sortBy]: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json(leads);
});

// Delete lead
router.delete('/:id', async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ message: 'Lead deleted' });
});

module.exports = router;
