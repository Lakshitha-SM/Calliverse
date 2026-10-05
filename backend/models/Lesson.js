const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, trim: true },
  category: { 
    type: String, 
    enum: ['beginner', 'intermediate', 'advanced'], 
    default: 'beginner' 
  },
  moduleName: { type: String, default: 'Foundations' },
  difficulty: { 
    type: String, 
    enum: ['easy', 'medium', 'hard'], 
    default: 'easy' 
  },
  estimatedMinutes: { type: Number, default: 15 },
  order: { type: Number, default: 1 },
  learningObjectives: [{ type: String }],
  explanation: { type: String, required: true },
  demonstration: {
    videoOrAnimationUrl: { type: String, default: '' },
    steps: [{ type: String }],
    proTip: { type: String, default: '' },
    penAngle: { type: String, default: '45-55 degrees' }
  },
  referenceImages: [{
    title: String,
    url: String,
    caption: String
  }],
  practiceTask: {
    taskPrompt: { type: String, required: true },
    referenceLetterOrWord: { type: String, default: 'A' },
    targetScore: { type: Number, default: 80 },
    focusMetric: { type: String, default: 'Stroke consistency & pressure release' }
  },
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
  isPublished: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);
