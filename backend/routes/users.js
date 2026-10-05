const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');

router.get('/me', protect, async (req, res) => {
  const user = await User.findById(req.user._id).select('-passwordHash');
  res.json(user);
});

router.put('/me', protect, async (req, res) => {
  const updates = req.body;
  delete updates.passwordHash;
  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-passwordHash');
  res.json(user);
});

router.put('/onboarding', protect, async (req, res) => {
  const {
    name,
    skillLevel = 'beginner',
    preferredStyles = [],
    learningGoals = [],
    interests = [],
    dailyPracticeTarget = 15,
    currentExperience = 'beginner',
    preferredDifficulty = 'easy',
  } = req.body;

  let recommendedPath = 'Basic Strokes → Letter Formation → Words → Flourishing';
  if (skillLevel === 'intermediate') {
    recommendedPath = 'Brush Lettering → Letter Connections → Spacing & Alignment → Composition';
  } else if (skillLevel === 'advanced') {
    recommendedPath = 'Advanced Flourishing → Custom Typography → Creative Lettering → Professional Portfolio';
  }

  const updateFields = {
    skillLevel,
    preferredStyles,
    learningGoals,
    interests,
    dailyPracticeTarget: Number(dailyPracticeTarget) || 15,
    currentExperience,
    preferredDifficulty,
    recommendedPath,
    onboardingComplete: true,
  };

  if (name && name.trim()) {
    updateFields.name = name.trim();
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    updateFields,
    { new: true }
  ).select('-passwordHash');

  res.json(user);
});

// Role switch / assign (for demo evaluation and role assignment)
router.put('/role', protect, async (req, res) => {
  const { role } = req.body;
  if (!['learner', 'mentor', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role specified' });
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { role },
    { new: true }
  ).select('-passwordHash');

  res.json({ message: `Role updated to ${role}`, user });
});

// Admin-only: list all users
router.get('/', protect, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
  res.json({ total: users.length, users });
});

router.get('/:id/profile', async (req, res) => {
  const user = await User.findById(req.params.id)
    .select('name avatar bio skillLevel preferredStyles followers following portfolio')
    .populate('portfolio', 'thumbnailUrl title category');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

router.post('/:id/follow', protect, async (req, res) => {
  if (req.params.id === req.user._id.toString())
    return res.status(400).json({ message: 'Cannot follow yourself' });
  const target = await User.findById(req.params.id);
  const me = await User.findById(req.user._id);
  if (!target) return res.status(404).json({ message: 'User not found' });
  const alreadyFollowing = me.following.includes(target._id);
  if (alreadyFollowing) {
    me.following.pull(target._id);
    target.followers.pull(me._id);
  } else {
    me.following.push(target._id);
    target.followers.push(me._id);
  }
  await me.save();
  await target.save();
  res.json({ following: !alreadyFollowing });
});

module.exports = router;
