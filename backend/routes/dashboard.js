// backend/routes/dashboard.js
const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead'); // You must have a Lead model
const authMiddleware = require('../middleware/auth'); // JWT auth

// GET /api/dashboard - protected route
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Basic lead stats grouped by status
    const stats = await Lead.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Recent leads
    const recentLeads = await Lead.find({ user: userId }).sort({ createdAt: -1 }).limit(10);

    res.json({
      stats: stats.reduce((acc, cur) => ({ ...acc, [cur._id]: cur.count }), {}),
      recentLeads
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ message: 'Failed to load dashboard data' });
  }
});

module.exports = router;
