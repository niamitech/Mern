const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const XLSX = require('xlsx');

router.get('/excel', async (req, res) => {
  try {
    const leads = await Lead.find().lean();

    // Map leads to worksheet rows
    const data = leads.map(lead => ({
  Name: lead.name,
  Email: lead.email,
  Phone: lead.phone,
  Company: lead.company,
  CreatedAt: lead.createdAt ? lead.createdAt.toISOString() : '', // <-- add check here
}));

    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, 'Leads');

    // Write workbook to buffer
    const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    // Set headers for file download
    res.setHeader('Content-Disposition', 'attachment; filename="leads.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    res.send(buf);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ message: 'Failed to export leads' });
  }
});

module.exports = router;
