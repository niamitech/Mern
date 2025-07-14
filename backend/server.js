const express = require('express');
const passport = require('passport');
const session = require('cookie-session');
require('dotenv').config();
require('./config/passport');

const app = express();

app.use(
  session({
    name: 'session',
    keys: ['secret'], // secure in production
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Auth Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false,
  }),
  (req, res) => {
    // Create your own JWT and send it
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.redirect(`http://localhost:3000/oauth-success?token=${token}`);
  }
);
