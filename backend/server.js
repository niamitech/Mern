const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 👇✅ MAKE SURE THIS COMES AFTER MIDDLEWARE
const statusRoutes = require('./routes/status');
const leadRoutes = require('./routes/leads'); // ✅ ADD THIS LINE
app.use('/api/status', statusRoutes);
app.use('/api/leads', leadRoutes); // ✅ ADD THIS LINE

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
