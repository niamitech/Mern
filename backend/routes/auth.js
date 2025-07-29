const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User'); // your User mongoose model
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// Setup nodemailer transporter (example with Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,    // your gmail address
    pass: process.env.EMAIL_PASS,    // your gmail password or app password
  },
});

// Register route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email taken' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString('hex');

    const user = new User({
      name,
      email,
      password: hashedPassword,
      verified: false,
      verificationToken,
    });

    await user.save();

    // Send verification email
    const verifyUrl = `${CLIENT_URL}/verify-email?token=${verificationToken}&email=${email}`;
    await transporter.sendMail({
      to: email,
      subject: 'Verify your email',
      html: `<p>Click <a href="${verifyUrl}">here</a> to verify your email.</p>`,
    });

    res.json({ message: 'Registered successfully. Please check your email to verify your account.' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Email verification route
router.get('/verify-email', async (req, res) => {
  const { token, email } = req.query;
  try {
    const user = await User.findOne({ email, verificationToken: token });
    if (!user) return res.status(400).send('Invalid token or email');

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    res.send('Email verified successfully. You can now login.');
  } catch (err) {
    console.error('Verify email error:', err);
    res.status(500).send('Server error');
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    if (!user.verified) return res.status(400).json({ message: 'Please verify your email before logging in.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout route (client typically just deletes token, so backend just responds ok)
router.post('/logout', (req, res) => {
  // For JWT stateless auth, logout is handled client side by deleting token
  res.json({ message: 'Logged out' });
});

module.exports = router;
