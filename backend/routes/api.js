const express = require('express');
const router = express.Router();

let leadIdCounter = 1;

// GET route example (keep your existing data route)
router.get('/data', (req, res) => {
  res.json({
    message: "This is your protected data!",
    timestamp: new Date().toISOString()
  });
});

// POST /api/leads - create a new lead and notify all clients
router.post('/leads', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  // Simulate saving lead (e.g. DB save here)
  const newLead = {
    id: leadIdCounter++,
    name,
    email,
    createdAt: new Date().toISOString()
  };

  // Emit notification to all connected clients
  req.io.emit('newLead', newLead);

  return res.status(201).json({ message: 'Lead created', lead: newLead });
});

module.exports = router;
