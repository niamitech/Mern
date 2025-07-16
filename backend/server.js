// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// === MIDDLEWARE ===
app.use(cors());
app.use(express.json());

// === ROUTES ===
const statusRoutes = require('./routes/status');
const leadRoutes = require('./routes/leads');

app.use('/api/status', statusRoutes);
app.use('/api/leads', leadRoutes); // ✅ Important: Register this AFTER express.json()

// === DATABASE CONNECTION ===
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// === START SERVER ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
