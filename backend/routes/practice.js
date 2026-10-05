const express = require('express');
const router = express.Router();
const {
  uploadImage,
  savePracticeAttempt,
  getPracticeAttempts,
  getPracticeAttemptById,
  deletePracticeAttempt
} = require('../controllers/practiceController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../config/upload');

// Image upload endpoint
router.post('/upload', protect, upload.single('image'), uploadImage);

// Practice attempt endpoints
router.post('/attempt', protect, savePracticeAttempt);
router.get('/attempts', protect, getPracticeAttempts);
router.get('/attempts/:id', protect, getPracticeAttemptById);
router.delete('/attempts/:id', protect, deletePracticeAttempt);

module.exports = router;
