const express = require('express');
const cors = require('cors');
const app = express();

// ✅ Allow frontend to access backend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Other middlewares
app.use(express.json());

// Routes
const leadRoutes = require('./routes/leads');
app.use('/api/leads', leadRoutes);

// (Optional) Status check route
app.get('/api/status', (req, res) => {
  res.send({ status: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
