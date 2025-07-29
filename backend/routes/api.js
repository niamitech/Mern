// backend/routes/api.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const dashboardController = require('../controllers/dashboard');

// Protected route for dashboard data
router.get('/dashboard', auth, dashboardController.getDashboardData);

module.exports = router;
