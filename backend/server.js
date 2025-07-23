const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

// Routes
app.get('/api/status', (req, res) => {
  res.json({
    success: true,
    message: 'API is running properly',
    timestamp: new Date()
  });
});

app.use('/api/leads', require('./routes/leads'));
app.use('/api/reports', require('./routes/reports'));  // This line must be present

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
