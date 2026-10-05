const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourseByIdOrSlug,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getCourses);
router.get('/:idOrSlug', getCourseByIdOrSlug);

// Mentor / Admin protected routes
router.post('/', protect, authorize('mentor', 'admin'), createCourse);
router.put('/:id', protect, authorize('mentor', 'admin'), updateCourse);
router.delete('/:id', protect, authorize('admin'), deleteCourse);

module.exports = router;
