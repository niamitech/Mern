const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

// GET: Heatmap data
router.get('/heatmap-data', async (req, res) => {
  try {
    const leads = await Lead.find({});
    const data = leads.map(lead => ({
      lat: lead.latitude,
      lng: lead.longitude,
      weight: lead.activityCount || 1
    }));
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching lead data.' });
  }
});

module.exports = router;
