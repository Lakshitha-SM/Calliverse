const mongoose = require('mongoose');

const aiAssessmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  practiceAttempt: { type: mongoose.Schema.Types.ObjectId, ref: 'PracticeAttempt' },
  targetReference: { type: String, required: true },
  imageUrl: { type: String, required: true },
  overallScore: { type: Number, required: true, min: 0, max: 100 },
  metrics: {
    shapeScore: { type: Number, min: 0, max: 100, default: 80 },
    strokeConsistency: { type: Number, min: 0, max: 100, default: 80 },
    spacing: { type: Number, min: 0, max: 100, default: 80 },
    alignment: { type: Number, min: 0, max: 100, default: 80 },
    slant: { type: Number, min: 0, max: 100, default: 80 },
    sizeConsistency: { type: Number, min: 0, max: 100, default: 80 },
    baselineConsistency: { type: Number, min: 0, max: 100, default: 80 },
    strokeSmoothness: { type: Number, min: 0, max: 100, default: 80 },
    proportion: { type: Number, min: 0, max: 100, default: 80 },
    similarity: { type: Number, min: 0, max: 100, default: 80 }
  },
  detectedCharacteristics: {
    estimatedSlantAngle: { type: Number, default: 55 },
    strokeThicknessRatio: { type: Number, default: 2.8 },
    baselineDriftPixels: { type: Number, default: 3.5 },
    inkCoverageRatio: { type: Number, default: 0.15 }
  },
  feedback: {
    goodPoints: [{ type: String }],
    needsImprovement: [{ type: String }],
    nextPracticeRecommendation: { type: String, default: '' },
    detailedAnalysis: { type: String, default: '' }
  },
  aiEngine: { type: String, default: 'CalliVision v2.4 (Explainable Multi-Metric Pipeline)' }
}, { timestamps: true });

module.exports = mongoose.model('AIAssessment', aiAssessmentSchema);
