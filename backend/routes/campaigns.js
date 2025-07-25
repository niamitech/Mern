const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const Lead = require('../models/Lead');

// Create new campaign
router.post('/', async (req, res) => {
  try {
    const campaign = new Campaign(req.body);
    await campaign.save();
    res.status(201).json(campaign);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all campaigns with basic stats
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate('leads').exec();
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Increment clicks count for a campaign
router.post('/:id/click', async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { $inc: { clicks: 1 } },
      { new: true }
    );
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Increment impressions count for a campaign
router.post('/:id/impression', async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { $inc: { impressions: 1 } },
      { new: true }
    );
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add lead to campaign and increment leadsGenerated
router.post('/:id/add-lead/:leadId', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

    const lead = await Lead.findById(req.params.leadId);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });

    // Add lead reference if not already in campaign
    if (!campaign.leads.includes(lead._id)) {
      campaign.leads.push(lead._id);
      campaign.leadsGenerated++;
      await campaign.save();

      // Also link lead back to campaign
      lead.campaign = campaign._id;
      await lead.save();
    }

    res.json(campaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
