// File: backend/services/hubspotService.js
const axios = require('axios');

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const HUBSPOT_URL = 'https://api.hubapi.com/crm/v3/objects/contacts';

const sendToHubSpot = async (lead) => {
  try {
    const response = await axios.post(
      `${HUBSPOT_URL}?hapikey=${HUBSPOT_API_KEY}`,
      {
        properties: {
          email: lead.email,
          firstname: lead.name,
          phone: lead.phone || '',
          message: lead.message || '',
          source: lead.source || 'Website',
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error sending to HubSpot:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = { sendToHubSpot };


// File: backend/routes/leads.js
const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const { sendToHubSpot } = require('../services/hubspotService');

router.post('/', async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    await newLead.save();

    // Send to HubSpot
    await sendToHubSpot(newLead);

    res.status(201).json({ message: 'Lead saved and sent to HubSpot successfully' });
  } catch (err) {
    console.error('Lead submission error:', err);
    res.status(400).json({ message: 'Failed to save/send lead', error: err });
  }
});

module.exports = router;


// .env file (add this)
HUBSPOT_API_KEY=your_hubspot_api_key_here
