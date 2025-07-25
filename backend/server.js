require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

let tokens = {
  google: null,
  facebook: null,
  linkedin: null,
};

// -------- GOOGLE ADS --------

// Exchange auth code for access token (OAuth2)
app.post('/api/google/auth', async (req, res) => {
  const { code } = req.body;
  try {
    const tokenRes = await axios.post(
      'https://oauth2.googleapis.com/token',
      new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    tokens.google = tokenRes.data.access_token;
    return res.json({ success: true, access_token: tokens.google });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

// Fetch Google Ads campaigns (using Google Ads API REST endpoint)
app.get('/api/google/campaigns', async (req, res) => {
  if (!tokens.google) return res.status(401).json({ error: 'Google access token missing' });

  try {
    // Replace with your actual Google Ads Customer ID
    const customerId = process.env.GOOGLE_CUSTOMER_ID;
    if (!customerId) return res.status(400).json({ error: 'Missing Google Customer ID in env' });

    const query = `query=SELECT campaign.id, campaign.name FROM campaign ORDER BY campaign.id`;

    const response = await axios.post(
      `https://googleads.googleapis.com/v14/customers/${customerId}/googleAds:search?${query}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${tokens.google}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return res.json(response.data);
  } catch (err) {
    return res.status(400).json({ error: err.response?.data || err.message });
  }
});

// -------- FACEBOOK ADS --------

// Exchange auth code for Facebook access token
app.post('/api/facebook/auth', async (req, res) => {
  const { code } = req.body;
  try {
    const fbTokenRes = await axios.get('https://graph.facebook.com/v14.0/oauth/access_token', {
      params: {
        client_id: process.env.FB_APP_ID,
        client_secret: process.env.FB_APP_SECRET,
        redirect_uri: process.env.FB_REDIRECT_URI,
        code,
      },
    });
    tokens.facebook = fbTokenRes.data.access_token;
    return res.json({ success: true, access_token: tokens.facebook });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

// Fetch Facebook Ad Accounts and campaigns
app.get('/api/facebook/campaigns', async (req, res) => {
  if (!tokens.facebook) return res.status(401).json({ error: 'Facebook access token missing' });

  try {
    // Fetch ad accounts
    const accountsRes = await axios.get('https://graph.facebook.com/v14.0/me/adaccounts', {
      headers: { Authorization: `Bearer ${tokens.facebook}` },
    });

    const adAccounts = accountsRes.data.data;
    if (!adAccounts.length) return res.json({ campaigns: [] });

    // Fetch campaigns from the first ad account
    const campaignsRes = await axios.get(`https://graph.facebook.com/v14.0/${adAccounts[0].id}/campaigns`, {
      headers: { Authorization: `Bearer ${tokens.facebook}` },
    });

    return res.json(campaignsRes.data);
  } catch (err) {
    return res.status(400).json({ error: err.response?.data || err.message });
  }
});

// -------- LINKEDIN ADS --------

// Exchange auth code for LinkedIn access token
app.post('/api/linkedin/auth', async (req, res) => {
  const { code } = req.body;
  try {
    const linkedinTokenRes = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    tokens.linkedin = linkedinTokenRes.data.access_token;
    return res.json({ success: true, access_token: tokens.linkedin });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

// Fetch LinkedIn Ad Campaigns for an Organization ID
app.get('/api/linkedin/campaigns', async (req, res) => {
  if (!tokens.linkedin) return res.status(401).json({ error: 'LinkedIn access token missing' });

  const orgId = req.query.orgId;
  if (!orgId) return res.status(400).json({ error: 'Organization ID (orgId) query parameter is required' });

  try {
    const response = await axios.get(
      `https://api.linkedin.com/v2/adCampaignsV2?q=search&search.organicOrg=urn:li:organization:${orgId}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.linkedin}`,
          'X-Restli-Protocol-Version': '2.0.0',
        },
      }
    );
    return res.json(response.data);
  } catch (err) {
    return res.status(400).json({ error: err.response?.data || err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
