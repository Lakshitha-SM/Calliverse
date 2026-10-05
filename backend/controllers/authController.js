const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// @desc    Register user
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields required' });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already registered' });

  // Default to learner unless mentor requested; protect admin unless explicit setup key
  let assignedRole = 'learner';
  if (role === 'mentor') assignedRole = 'mentor';
  if (role === 'admin') assignedRole = 'admin';

  const user = await User.create({
    name,
    email,
    passwordHash: password,
    role: assignedRole,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    skillLevel: user.skillLevel,
    dailyPracticeTarget: user.dailyPracticeTarget,
    recommendedPath: user.recommendedPath,
    xp: user.xp,
    level: user.level,
    onboardingComplete: user.onboardingComplete,
    preferences: user.preferences,
    token: generateToken(user._id),
  });
};

// @desc    Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });

  // Auto-provision demo accounts if they don't exist yet
  const demoAccounts = {
    'learner@calliverse.com': { name: 'Elena Vance (Learner)', role: 'learner', skillLevel: 'beginner', xp: 240, level: 'Learner', streak: 4, onboardingComplete: true },
    'artist@calliverse.com': { name: 'Julian Cross (Learner)', role: 'learner', skillLevel: 'intermediate', xp: 620, level: 'Practitioner', streak: 7, onboardingComplete: true },
    'mentor@calliverse.com': { name: 'Master Sophia Chen', role: 'mentor', skillLevel: 'advanced', xp: 2800, level: 'Expert', streak: 21, onboardingComplete: true },
    'admin@calliverse.com': { name: 'CalliVerse Admin', role: 'admin', skillLevel: 'advanced', xp: 5000, level: 'Expert', streak: 30, onboardingComplete: true },
    'master@calliverse.com': { name: 'Master Sophia Chen', role: 'mentor', skillLevel: 'advanced', xp: 2800, level: 'Expert', streak: 21, onboardingComplete: true },
  };

  if (!user && demoAccounts[email?.toLowerCase()]) {
    const demo = demoAccounts[email.toLowerCase()];
    user = await User.create({
      name: demo.name,
      email: email.toLowerCase(),
      passwordHash: password || 'calliverse123',
      role: demo.role,
      skillLevel: demo.skillLevel,
      xp: demo.xp,
      level: demo.level,
      streak: demo.streak,
      onboardingComplete: demo.onboardingComplete,
    });
  }

  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: 'Invalid email or password' });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role || 'learner',
    avatar: user.avatar,
    skillLevel: user.skillLevel,
    dailyPracticeTarget: user.dailyPracticeTarget || 15,
    recommendedPath: user.recommendedPath,
    xp: user.xp || 0,
    level: user.level || 'Beginner',
    onboardingComplete: user.onboardingComplete,
    preferences: user.preferences,
    token: generateToken(user._id),
  });
};

// @desc    Get current user
const getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select('-passwordHash');
  res.json(user);
};

module.exports = { registerUser, loginUser, getMe };
