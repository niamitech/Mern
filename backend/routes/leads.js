const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const Lead = require('../models/Lead');
const sendEmail = require('../utils/sendEmail');
const { parseExcel, generateExcel } = require('../utils/csvHelper');

// ✅ POST /api/leads — Create lead and send email
router.post('/', async (req, res) => {
  try {
    const { name, email, source, tags } = req.body;
    const score = Math.floor(Math.random() * 100);

    const lead = new Lead({ name, email, source, score, tags });
    await lead.save();

    await sendEmail(email, score);

    res.status(200).json({ message: 'Lead saved and email sent', score });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save lead or send email', error: err });
  }
});

// ✅ GET /api/leads — Get all leads
router.get('/', async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch leads', error: err });
  }
});

// ✅ PUT /api/leads/:id/tags — Update lead tags
router.put('/:id/tags', async (req, res) => {
  try {
    const { tags } = req.body;
    const lead = await Lead.findByIdAndUpdate(req.params.id, { tags }, { new: true });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: 'Error updating tags', error: err });
  }
});

// ✅ POST /api/leads/import — Import leads from Excel/CSV
router.post('/import', upload.single('file'), async (req, res) => {
  try {
    const data = parseExcel(req.file.buffer);
    const leads = await Lead.insertMany(data);
    res.json({ message: 'Leads imported successfully', count: leads.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to import leads' });
  }
});

// ✅ GET /api/leads/export — Export all leads to Excel
router.get('/export', async (req, res) => {
  try {
    const leads = await Lead.find().lean();
    const buffer = generateExcel(leads);
    res.setHeader('Content-Disposition', 'attachment; filename=leads.xlsx');
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to export leads' });
  }
});

module.exports = router;
