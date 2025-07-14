// backend/routes/status.js
const express = require('express');
const router = express.Router();

router.get('/user-data', auth, authorizeRoles('user', 'admin'), (req, res) => {
  res.json({ message: 'Accessible by all users' });
});


module.exports = router;
