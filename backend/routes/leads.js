const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

// Basic lead scoring logic
function calculateScore(lead) {
  let score = 0;

  if (lead.email) score += 10;
  if (lead.phone) score += 5;
  if (lead.message && lead.message.length > 20) score += 5;
  if (lead.source === 'Referral') score += 10;
  else if (lead.source === 'Website') score += 5;

  return score;
}

router.post('/', async (req, res) => {
  try {
    const leadData = req.body;
    const score = calculateScore(leadData);

    const newLead = new Lead({ ...leadData, score });
    await newLead.save();

    res.status(201).json({
      message: 'Lead saved successfully',
      lead: {
        name: newLead.name,
        email: newLead.email,
        source: newLead.source,
        score: newLead.score,
        createdAt: newLead.createdAt,
      }
    });
  } catch (err) {
    console.error('Lead submission error:', err);
    res.status(400).json({ message: 'Failed to save lead', error: err });
  }
});

module.exports = router;
