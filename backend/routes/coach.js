const express = require('express');
const router = express.Router();
const {
  getPersonalizedRecommendations,
  askCalliCoach
} = require('../controllers/coachController');
const { protect } = require('../middleware/authMiddleware');

// CalliCoach AI & recommendation endpoints
router.get('/recommendations', protect, getPersonalizedRecommendations);
router.post('/ask', protect, askCalliCoach);

module.exports = router;
