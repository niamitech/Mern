const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { passport, generateJWT } = require('./config/passport');
// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

const statusRoutes = require('./routes/status');
app.use('/api/status', statusRoutes);


// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Start Google OAuth login
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login-failure' }),
  (req, res) => {
    // Successful login
    // Generate JWT and send to frontend (e.g., redirect with token or cookie)
    const token = generateJWT(req.user);
    // For demo, send token in URL query param (not recommended in prod)
    res.redirect(`http://localhost:3000/login-success?token=${token}`);
  });

// Optional: login failure route
app.get('/login-failure', (req, res) => {
  res.send('Failed to authenticate..');
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
