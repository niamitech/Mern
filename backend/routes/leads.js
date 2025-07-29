const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Lead = require('../models/Lead');

// Create a new lead
router.post('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, phone, status } = req.body;

    const lead = new Lead({
      user: userId,
      name,
      email,
      phone,
      status: status || 'new',
    });

    await lead.save();
    res.status(201).json(lead);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
