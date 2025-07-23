const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

router.get('/lead-report', async (req, res) => {
    try {
        const { start, end } = req.query;
        const leads = await Lead.find({
            createdAt: {
                $gte: new Date(start),
                $lte: new Date(end),
            },
        });
        res.json(leads);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
