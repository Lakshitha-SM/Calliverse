const mongoose = require('mongoose');

const practiceAttemptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
  title: { type: String, default: 'Calligraphy Practice Drill' },
  targetReference: { type: String, required: true }, // e.g. 'a', 'minimum', 'Downstroke'
  attemptType: { 
    type: String, 
    enum: ['digital_canvas', 'handwritten_upload'], 
    default: 'digital_canvas' 
  },
  imageUrl: { type: String, required: true },
  thumbnailUrl: { type: String, default: '' },
  canvasData: { type: String, default: '' }, // JSON string if digital canvas
  attemptNumber: { type: Number, default: 1 },
  durationSeconds: { type: Number, default: 60 },
  metrics: {
    overallScore: { type: Number, min: 0, max: 100 },
    shapeScore: { type: Number, min: 0, max: 100 },
    strokeConsistencyScore: { type: Number, min: 0, max: 100 },
    spacingScore: { type: Number, min: 0, max: 100 },
    alignmentScore: { type: Number, min: 0, max: 100 },
    slantScore: { type: Number, min: 0, max: 100 },
    smoothnessScore: { type: Number, min: 0, max: 100 },
    proportionScore: { type: Number, min: 0, max: 100 }
  },
  feedback: {
    goodPoints: [{ type: String }],
    needsImprovement: [{ type: String }],
    nextPracticeRecommendation: { type: String, default: '' }
  },
  isFavorite: { type: Boolean, default: false },
  notes: { type: String, default: '' }
}, { timestamps: true });

// Index for fast query of attempts by user and reference
practiceAttemptSchema.index({ user: 1, targetReference: 1, createdAt: -1 });

module.exports = mongoose.model('PracticeAttempt', practiceAttemptSchema);
