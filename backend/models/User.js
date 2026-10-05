const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String },
  googleId: { type: String },
  avatar: { type: String, default: '' },
  bio: { type: String, default: '' },
  role: { type: String, enum: ['learner', 'mentor', 'admin'], default: 'learner' },
  skillLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  currentExperience: { type: String, default: 'beginner' },
  preferredDifficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' },
  dailyPracticeTarget: { type: Number, default: 15 }, // minutes per day
  recommendedPath: { type: String, default: 'Basic Strokes → Letter Formation → Words → Flourishing' },
  xp: { type: Number, default: 0 },
  level: { type: String, enum: ['Beginner', 'Learner', 'Practitioner', 'Intermediate', 'Advanced', 'Expert'], default: 'Beginner' },
  accountStatus: { type: String, enum: ['active', 'suspended', 'pending'], default: 'active' },
  preferredStyles: [{ type: String }],
  learningGoals: [{ type: String }],
  interests: [{ type: String }],
  preferences: {
    theme: { type: String, default: 'dark' },
    notifications: { type: Boolean, default: true },
    dailyQuote: { type: Boolean, default: true },
  },
  streak: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now },
  badges: [{ name: String, icon: String, earnedAt: Date }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  savedDesigns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Design' }],
  portfolio: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Design' }],
  onboardingComplete: { type: Boolean, default: false },
}, { timestamps: true });

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash') || !this.passwordHash) return next();
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
