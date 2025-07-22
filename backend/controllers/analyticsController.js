const Lead = require('../models/Lead');

const getLeadAnalytics = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const convertedLeads = await Lead.countDocuments({ status: 'converted' });

    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const activityData = await Lead.aggregate([
      { $match: { createdAt: { $gte: last30Days } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(2) : 0;

    res.json({
      totalLeads,
      convertedLeads,
      conversionRate,
      activityData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching analytics data' });
  }
};

module.exports = { getLeadAnalytics };
