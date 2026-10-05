const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  title: { type: String, required: true, trim: true },
  targetCharacter: { type: String, required: true }, // e.g., 'Downstroke', 'a', 'Flourish Loop'
  category: { 
    type: String, 
    enum: ['beginner', 'intermediate', 'advanced'], 
    default: 'beginner' 
  },
  difficulty: { 
    type: String, 
    enum: ['easy', 'medium', 'hard'], 
    default: 'easy' 
  },
  focusArea: { type: String, default: 'stroke consistency' }, // e.g. pressure control, spacing, slant alignment
  strokeSteps: [{ type: String }],
  referenceGuide: {
    fontStyle: { type: String, default: 'Cormorant Garamond' },
    sampleText: { type: String, default: '' },
    instruction: { type: String, default: '' }
  },
  guidelineConfig: {
    hasBaseline: { type: Boolean, default: true },
    hasXHeight: { type: Boolean, default: true },
    hasAscender: { type: Boolean, default: true },
    hasDescender: { type: Boolean, default: true },
    slantAngle: { type: Number, default: 55 }, // 55° standard calligraphy slant, 0 for roman/upright
    lineSpacing: { type: Number, default: 40 }
  },
  estimatedMinutes: { type: Number, default: 10 },
  targetScore: { type: Number, default: 80 },
  order: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model('Exercise', exerciseSchema);
