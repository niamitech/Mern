// backend/controllers/dashboard.js
const Lead = require('../models/Lead'); // Assuming Lead model exists

exports.getDashboardData = async (req, res) => {
  try {
    // Aggregate stats for leads
    const stats = await Lead.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Recent leads (limit to 5)
    const recentLeads = await Lead.find().sort({ createdAt: -1 }).limit(5);

    res.json({ stats, recentLeads });
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};
