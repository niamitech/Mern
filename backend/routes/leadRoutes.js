const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer();

const Lead = require('../models/Lead');
const { parseExcel, generateExcel } = require('../utils/csvHelper');

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
