const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

router.post('/', async (req, res) => {
    try {
        const { name, email, source } = req.body;
        const score = Math.floor(Math.random() * 100); // Dummy prediction
        const newLead = new Lead({ name, email, source, score });
        await newLead.save();
        res.json(newLead);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.json(leads);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
