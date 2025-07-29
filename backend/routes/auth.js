const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const User = require('../models/User');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ email, password: hashed });
    res.json({ userId: user._id });
  } catch (e) {
    res.status(400).json({ message: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  if (user.is2FAEnabled) {
    return res.json({ requires2FA: true, userId: user._id });
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET);
  res.json({ token });
});

router.post('/2fa/setup', async (req, res) => {
  const { userId } = req.body;
  const secret = speakeasy.generateSecret({ name: `MERN‑2FA‑App (${userId})` });
  await User.findByIdAndUpdate(userId, { twoFASecret: secret.base32 });
  const qrCode = await qrcode.toDataURL(secret.otpauth_url);
  res.json({ qrCode });
});

router.post('/2fa/verify', async (req, res) => {
  const { userId, token } = req.body;
  const user = await User.findById(userId);
  const verified = speakeasy.totp.verify({
    secret: user.twoFASecret,
    encoding: 'base32',
    token,
    window: 1,
  });
  if (!verified) return res.status(401).json({ message: 'Invalid 2FA code' });
  await User.findByIdAndUpdate(userId, { is2FAEnabled: true });
  const jwtToken = jwt.sign({ id: user._id }, JWT_SECRET);
  res.json({ token: jwtToken });
});

router.post('/2fa/verify', async (req, res) => {
  const { userId, token } = req.body;
  const user = await User.findById(userId);

  const verified = speakeasy.totp.verify({
    secret: user.twoFASecret,
    encoding: 'base32',
    token,
    window: 1
  });

  if (!verified) {
    return res.status(401).json({ message: 'Invalid 2FA code' });
  }

  user.is2FAEnabled = true;
  await user.save();

  const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token: jwtToken });
});

module.exports = router;
