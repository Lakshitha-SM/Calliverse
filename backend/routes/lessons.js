const express = require('express');
const router = express.Router();
const {
  getLessons,
  getLessonByIdOrSlug,
  createLesson,
  updateLesson,
  completeLesson
} = require('../controllers/lessonController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getLessons);
router.get('/:idOrSlug', getLessonByIdOrSlug);

// Learner completion tracking
router.post('/:id/complete', protect, completeLesson);

// Mentor / Admin protected routes
router.post('/', protect, authorize('mentor', 'admin'), createLesson);
router.put('/:id', protect, authorize('mentor', 'admin'), updateLesson);

module.exports = router;
