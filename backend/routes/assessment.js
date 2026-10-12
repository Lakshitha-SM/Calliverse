const express = require('express');
const router = express.Router();
const {
  runAssessment,
  getAssessmentHistory,
  getAssessmentById
} = require('../controllers/assessmentController');
const { protect } = require('../middleware/authMiddleware');

// Assessment endpoints
router.post('/analyze', protect, runAssessment);
router.get('/history', protect, getAssessmentHistory);
router.get('/:id', protect, getAssessmentById);

module.exports = router;
