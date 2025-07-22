const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

// Total leads
router.get("/total", async (req, res) => {
    const count = await Lead.countDocuments();
    res.json({ totalLeads: count });
});

// Conversion rate = converted / total
router.get("/conversion-rate", async (req, res) => {
    const total = await Lead.countDocuments();
    const converted = await Lead.countDocuments({ status: "converted" });
    const rate = total === 0 ? 0 : ((converted / total) * 100).toFixed(2);
    res.json({ conversionRate: rate });
});

// Daily lead count (last 7 days)
router.get("/daily", async (req, res) => {
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 6);

    const leads = await Lead.aggregate([
        { $match: { createdAt: { $gte: last7Days } } },
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ]);

    res.json({ dailyLeads: leads });
});

module.exports = router;
