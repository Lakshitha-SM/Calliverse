const express = require('express');
const router = express.Router();
const {
  getExercises,
  getExerciseById,
  createExercise
} = require('../controllers/exerciseController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getExercises);
router.get('/:id', getExerciseById);

// Mentor / Admin protected routes
router.post('/', protect, authorize('mentor', 'admin'), createExercise);

module.exports = router;
