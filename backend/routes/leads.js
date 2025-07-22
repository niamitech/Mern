const express = require('express');
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');
const Lead = require('../models/Lead');

const router = express.Router();

// File upload config
const upload = multer({ dest: 'uploads/' });

// 📥 Import leads from CSV
router.post('/import', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;
  const leads = [];

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
      leads.push(row);
    })
    .on('end', async () => {
      try {
        await Lead.insertMany(leads);
        fs.unlinkSync(filePath); // cleanup
        res.json({ success: true, message: 'Leads imported successfully!' });
      } catch (err) {
        console.error('❌ Import error:', err);
        res.status(500).json({ success: false, error: 'Failed to import leads.' });
      }
    });
});
const exportDir = path.join(__dirname, '..', 'exports');
if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir);
}
// 📤 Export leads to CSV
router.get('/export', async (req, res) => {
  try {
    const leads = await Lead.find();

    const csvHeaders = Object.keys(leads[0]?._doc || {}).join(',') + '\n';
    const csvData = leads.map(lead => Object.values(lead._doc).join(',')).join('\n');

    const filePath = path.join(__dirname, '../exports/leads.csv');
    fs.writeFileSync(filePath, csvHeaders + csvData);

    res.download(filePath, 'leads.csv', () => {
      fs.unlinkSync(filePath);
    });
  } catch (err) {
    console.error('❌ Export error:', err);
    res.status(500).json({ success: false, error: 'Failed to export leads.' });
  }
});

module.exports = router;
