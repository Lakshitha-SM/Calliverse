const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getProgress, updateProgress, completeLesson, getDailyChallenges } = require('../controllers/progressController');

router.get('/', protect, getProgress);
router.put('/', protect, updateProgress);
router.post('/lesson', protect, completeLesson);
router.get('/challenges', protect, getDailyChallenges);

module.exports = router;
