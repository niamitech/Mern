const express = require('express');
const cors = require('cors');
const app = express();

// ✅ Allow frontend to access backend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Middlewares
app.use(express.json());

// Routes
const leadRoutes = require('./routes/leads');
app.use('/api/leads', leadRoutes);

// ✅ Health check route (can be used optionally)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    time: new Date().toISOString(),
  });
});

// ✅ Main API status route expected by React
app.get('/api/status', (req, res) => {
  res.send({
    success: true,
    message: 'API is healthy!',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
