const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const nodemailer = require('nodemailer');

// Scoring function
const calculateScore = (lead) => {
  let score = 0;
  if (lead.source === 'Website') score += 30;
  if (lead.email.endsWith('@company.com')) score += 40;
  if (lead.message && lead.message.length > 10) score += 30;
  return score;
};

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.post('/', async (req, res) => {
  try {
    const leadData = req.body;
    const score = calculateScore(leadData);
    const newLead = new Lead({ ...leadData, score });
    await newLead.save();

    // Auto follow-up email for high score
    if (score >= 70) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: newLead.email,
        subject: 'Thanks for your interest!',
        text: `Hi ${newLead.name},\n\nThanks for reaching out. We'll follow up with you soon.\n\nYour lead score: ${score}`
      });
    }

    res.status(201).json({ message: 'Lead saved and email sent (if qualified)', score });
  } catch (err) {
    console.error('Lead submission error:', err);
    res.status(400).json({ message: 'Failed to save lead or send email', error: err });
  }
});

module.exports = router;
