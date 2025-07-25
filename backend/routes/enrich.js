const express = require('express');
const router = express.Router();
const axios = require('axios');

const CLEARBIT_API_KEY = process.env.CLEARBIT_API_KEY;

// Basic Clearbit enrichment using Person API by email
router.post('/', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required for enrichment' });
  }

  try {
    const response = await axios.get(`https://person.clearbit.com/v2/people/find?email=${encodeURIComponent(email)}`, {
      headers: {
        Authorization: `Bearer ${CLEARBIT_API_KEY}`
      }
    });

    // Send enriched data back to frontend
    return res.json({ enrichedData: response.data });
  } catch (error) {
    // Clearbit returns 404 if person not found
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: 'No enrichment data found for this email' });
    }
    console.error('Clearbit API error:', error.message);
    return res.status(500).json({ message: 'Failed to enrich data' });
  }
});

module.exports = router;
