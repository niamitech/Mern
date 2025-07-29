const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth'); // to protect routes

// Register with GDPR consent required
router.post('/register', async (req, res) => {
  try {
    const { email, password, consent } = req.body;
    if (!email || !password || consent !== true) {
      return res.status(400).json({ message: 'Email, password and consent are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword, consent });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
    res.json({ token, userId: user._id });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user data (GDPR right to access)
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user data (GDPR right to rectification)
router.put('/me', authMiddleware, async (req, res) => {
  try {
    const { email, consent } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (email) user.email = email;
    if (typeof consent === 'boolean') user.consent = consent;

    await user.save();
    res.json({ message: 'User updated' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user (GDPR right to erasure)
router.delete('/me', authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.userId);
    res.json({ message: 'User deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
