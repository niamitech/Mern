const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

router.get('/recommendations', async (req, res) => {
    try {
        const leads = await Lead.find().sort({ score: -1 }).limit(5);
        res.json({
            message: 'Top leads prioritized by ML score',
            recommendations: leads,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
