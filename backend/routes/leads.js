const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const sendEmail = require('../utils/sendEmail');

function calculateScore(lead) {
  let score = 0;
  if (lead.source === 'Website') score += 10;
  if (lead.email.endsWith('@company.com')) score += 10;
  if (lead.message && lead.message.length > 50) score += 5;
  return score;
}

router.post('/', async (req, res) => {
  try {
    const score = calculateScore(req.body);
    const newLead = new Lead({ ...req.body, score });
    await newLead.save();

    await sendEmail({
      to: req.body.email,
      subject: 'Thanks for your inquiry!',
      text: `Hi ${req.body.name}, thanks for your message. We'll be in touch!`,
      html: `<p>Hi ${req.body.name},</p><p>Thanks for reaching out. We'll follow up soon!</p>`
    });

    res.status(201).json({ message: 'Lead saved and email sent', score });
  } catch (err) {
    console.error('Lead error:', err);
    res.status(400).json({ message: 'Failed to save lead or send email', error: err });
  }
});

module.exports = router;
