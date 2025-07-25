require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sendSMS, sendEmail } = require('./services/communication');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mongoose Schemas & Models
const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String,
  createdAt: { type: Date, default: Date.now }
});
const Lead = mongoose.model('Lead', leadSchema);

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String
});
const Contact = mongoose.model('Contact', contactSchema);

// Routes

// Get all leads
app.get('/api/leads', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// Add new lead
app.post('/api/leads', async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    await newLead.save();
    res.status(201).json(newLead);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add lead' });
  }
});

// Get all contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Add new contact
app.post('/api/contacts', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add contact' });
  }
});

// Communication endpoints

// Send SMS to lead
app.post('/api/communication/sms', async (req, res) => {
  const { toPhone, message } = req.body;
  if (!toPhone || !message) {
    return res.status(400).json({ error: 'toPhone and message are required' });
  }
  try {
    const smsResult = await sendSMS(toPhone, message);
    res.json({ success: true, result: smsResult });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send SMS', details: err.message });
  }
});

// Send Email to lead
app.post('/api/communication/email', async (req, res) => {
  const { toEmail, subject, text } = req.body;
  if (!toEmail || !subject || !text) {
    return res.status(400).json({ error: 'toEmail, subject and text are required' });
  }
  try {
    const emailResult = await sendEmail(toEmail, subject, text);
    res.json({ success: true, result: emailResult });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send email', details: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
