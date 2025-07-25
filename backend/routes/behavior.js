const express = require('express');
const router = express.Router();

// In-memory store for demo purposes
// Format: { leadId: [ { eventType, details, timestamp }, ... ] }
const behaviorStore = {};

// POST /api/behavior - record a behavior event for a lead
// Expects JSON body: { leadId, eventType, details }
router.post('/', (req, res) => {
  const { leadId, eventType, details } = req.body;

  if (!leadId || !eventType) {
    return res.status(400).json({ message: 'leadId and eventType are required' });
  }

  const event = {
    eventType,
    details: details || {},
    timestamp: new Date().toISOString()
  };

  if (!behaviorStore[leadId]) {
    behaviorStore[leadId] = [];
  }
  behaviorStore[leadId].push(event);

  res.status(201).json({ message: 'Behavior event recorded', event });
});

// GET /api/behavior/:leadId - get all behavior events for a lead
router.get('/:leadId', (req, res) => {
  const { leadId } = req.params;
  const events = behaviorStore[leadId] || [];
  res.json({ leadId, events });
});

module.exports = router;
