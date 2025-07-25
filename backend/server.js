require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Lead schema
const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  source: String,
  createdAt: { type: Date, default: Date.now }
});

const Lead = mongoose.model('Lead', leadSchema);

// Webhook route - receives leads from external sources
app.post('/api/webhook/leads', async (req, res) => {
  try {
    const { name, email, phone, source } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Save lead
    const lead = new Lead({ name, email, phone, source });
    await lead.save();

    console.log('New lead saved:', lead);

    // Respond 200 OK
    return res.status(200).json({ success: true, lead });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get all leads (for frontend)
app.get('/api/leads', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching leads' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
