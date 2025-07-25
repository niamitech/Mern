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

// === MODELS ===
const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  source: String,
  createdAt: { type: Date, default: Date.now }
});
const Lead = mongoose.model('Lead', leadSchema);

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String,
  createdAt: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

const campaignSchema = new mongoose.Schema({
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  budget: Number,
  createdAt: { type: Date, default: Date.now }
});
const Campaign = mongoose.model('Campaign', campaignSchema);

// === ROUTES ===

// --- Leads ---
app.get('/api/leads', async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json(leads);
});

app.get('/api/leads/:id', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.json(lead);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

app.post('/api/leads', async (req, res) => {
  const lead = new Lead(req.body);
  await lead.save();
  res.status(201).json(lead);
});

app.put('/api/leads/:id', async (req, res) => {
  try {
    const updated = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Lead not found' });
    res.json(updated);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

app.delete('/api/leads/:id', async (req, res) => {
  try {
    const deleted = await Lead.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Lead not found' });
    res.json({ message: 'Lead deleted' });
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

// --- Contacts ---
app.get('/api/contacts', async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

app.get('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json(contact);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

app.post('/api/contacts', async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.status(201).json(contact);
});

app.put('/api/contacts/:id', async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Contact not found' });
    res.json(updated);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Contact not found' });
    res.json({ message: 'Contact deleted' });
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

// --- Campaigns ---
app.get('/api/campaigns', async (req, res) => {
  const campaigns = await Campaign.find().sort({ createdAt: -1 });
  res.json(campaigns);
});

app.get('/api/campaigns/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
    res.json(campaign);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

app.post('/api/campaigns', async (req, res) => {
  const campaign = new Campaign(req.body);
  await campaign.save();
  res.status(201).json(campaign);
});

app.put('/api/campaigns/:id', async (req, res) => {
  try {
    const updated = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Campaign not found' });
    res.json(updated);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

app.delete('/api/campaigns/:id', async (req, res) => {
  try {
    const deleted = await Campaign.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Campaign not found' });
    res.json({ message: 'Campaign deleted' });
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
