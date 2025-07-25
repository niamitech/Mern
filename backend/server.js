require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const apiRoutes = require('./routes/api');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rate limiter config from env
const apiLimiter = rateLimit({
  windowMs: (process.env.RATE_LIMIT_WINDOW_MINUTES || 15) * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 10,
  message: {
    status: 429,
    message: "Too many requests from this IP, please try again later."
  }
});

// Apply limiter only on API routes
app.use('/api', apiLimiter);

// Use your routes
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
