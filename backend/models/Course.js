const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  subtitle: { type: String, default: '' },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['beginner', 'intermediate', 'advanced'], 
    default: 'beginner' 
  },
  level: { type: String, default: 'Beginner' },
  style: { type: String, default: 'Modern & Traditional' }, // e.g. Brush, Gothic, Modern, Copperplate
  thumbnailUrl: { type: String, default: '' },
  estimatedHours: { type: Number, default: 3 },
  tags: [{ type: String }],
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  instructorName: { type: String, default: 'Master Sophia Chen' },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  learningOutcomes: [{ type: String }],
  isPublished: { type: Boolean, default: true },
  order: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
