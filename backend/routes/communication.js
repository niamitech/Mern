const express = require('express');
const router = express.Router();
const { sendSMS, sendEmail } = require('../services/communication');

router.post('/send-sms', async (req, res) => {
  const { phone, message } = req.body;
  if (!phone || !message) return res.status(400).json({ error: 'phone and message required' });

  try {
    const result = await sendSMS(phone, message);
    res.json({ success: true, sid: result.sid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/send-email', async (req, res) => {
  const { email, subject, text } = req.body;
  if (!email || !subject || !text) return res.status(400).json({ error: 'email, subject, and text required' });

  try {
    await sendEmail(email, subject, text);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
