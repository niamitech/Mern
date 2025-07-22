const express = require('express');
const router = express.Router();
const { getLeadAnalytics } = require('../controllers/analyticsController');

router.get('/lead-analytics', getLeadAnalytics);

module.exports = router;