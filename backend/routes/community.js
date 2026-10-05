const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getFeed, createPost, likePost, commentPost, bookmarkPost } = require('../controllers/communityController');

router.get('/feed', protect, getFeed);
router.post('/posts', protect, createPost);
router.post('/posts/:id/like', protect, likePost);
router.post('/posts/:id/comment', protect, commentPost);
router.post('/posts/:id/bookmark', protect, bookmarkPost);

module.exports = router;
