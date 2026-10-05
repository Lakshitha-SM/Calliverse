const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getRecommendations, getMoodInspiration } = require('../controllers/recommendController');

router.get('/', protect, getRecommendations);
router.get('/mood', protect, getMoodInspiration);

module.exports = router;
