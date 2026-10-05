const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  lessonsCompleted: [{ lessonId: String, title: String, completedAt: Date }],
  practiceMinutes: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now },
  skillBreakdown: {
    spacing: { type: Number, default: 0, min: 0, max: 100 },
    slant: { type: Number, default: 0, min: 0, max: 100 },
    smoothness: { type: Number, default: 0, min: 0, max: 100 },
    pressure: { type: Number, default: 0, min: 0, max: 100 },
  },
  badges: [{
    name: String,
    icon: String,
    description: String,
    earnedAt: { type: Date, default: Date.now }
  }],
  challenges: [{
    title: String,
    description: String,
    completed: Boolean,
    dueDate: Date,
  }],
  totalUploads: { type: Number, default: 0 },
  xp: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);
