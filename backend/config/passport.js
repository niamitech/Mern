const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

// Normally you would save/find user in DB here. For demo, just return profile.
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => {
  // You can create or fetch user from DB here
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Helper: generate JWT token with user profile info
function generateJWT(user) {
  const payload = {
    id: user.id,
    displayName: user.displayName,
    emails: user.emails,
    photos: user.photos,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

module.exports = {
  passport,
  generateJWT,
};
