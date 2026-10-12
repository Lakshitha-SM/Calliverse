const AIAssessment = require('../models/AIAssessment');
const PracticeAttempt = require('../models/PracticeAttempt');
const Progress = require('../models/Progress');
const User = require('../models/User');
const { analyzeCalligraphyImage } = require('../services/aiAssessmentEngine');

// @desc    Perform AI Calligraphy Assessment on image
// @route   POST /api/assessment/analyze
// @access  Private
const runAssessment = async (req, res) => {
  try {
    const { imageUrl, base64Data, targetReference = 'a', practiceAttemptId } = req.body;

    const targetImage = imageUrl || base64Data;
    if (!targetImage) {
      return res.status(400).json({ message: 'Calligraphy image is required for AI assessment' });
    }

    // Run explainable multi-metric assessment pipeline
    const assessmentResult = await analyzeCalligraphyImage(targetImage, targetReference);

    // Save to AIAssessment model
    const assessment = await AIAssessment.create({
      user: req.user._id,
      practiceAttempt: practiceAttemptId || undefined,
      targetReference,
      imageUrl: targetImage.startsWith('data:') ? (imageUrl || '/uploads/calli-practice.png') : targetImage,
      overallScore: assessmentResult.overallScore,
      metrics: assessmentResult.metrics,
      detectedCharacteristics: assessmentResult.detectedCharacteristics,
      feedback: assessmentResult.feedback,
      aiEngine: assessmentResult.aiEngine
    });

    // Update PracticeAttempt with metrics if attempt id provided
    if (practiceAttemptId) {
      await PracticeAttempt.findByIdAndUpdate(practiceAttemptId, {
        metrics: assessmentResult.metrics,
        feedback: assessmentResult.feedback
      });
    }

    // Update User Progress with updated skill breakdown & +15 XP
    const xpBonus = 15;
    const progress = await Progress.findOneAndUpdate(
      { user: req.user._id },
      {
        $set: {
          'skillBreakdown.spacing': assessmentResult.metrics.spacing,
          'skillBreakdown.slant': assessmentResult.metrics.slant,
          'skillBreakdown.smoothness': assessmentResult.metrics.strokeSmoothness,
          'skillBreakdown.pressure': assessmentResult.metrics.strokeConsistency,
          lastActive: new Date()
        },
        $inc: {
          xp: xpBonus,
          totalUploads: 1
        }
      },
      { new: true, upsert: true }
    );

    // Update User XP
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $inc: { xp: xpBonus } },
      { new: true }
    ).select('-passwordHash');

    res.status(201).json({
      message: 'AI Assessment completed successfully!',
      assessment,
      xpEarned: xpBonus,
      progress,
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'AI assessment failed' });
  }
};

// @desc    Get user's AI Assessment history
// @route   GET /api/assessment/history
// @access  Private
const getAssessmentHistory = async (req, res) => {
  try {
    const assessments = await AIAssessment.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20);

    // Calculate score trends
    const scores = assessments.map(a => a.overallScore);
    const averageScore = scores.length > 0 
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) 
      : 84;

    res.json({
      total: assessments.length,
      averageScore,
      assessments
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch assessment history' });
  }
};

// @desc    Get single assessment by ID
// @route   GET /api/assessment/:id
// @access  Private
const getAssessmentById = async (req, res) => {
  try {
    const assessment = await AIAssessment.findById(req.params.id);
    if (!assessment) return res.status(404).json({ message: 'Assessment not found' });

    if (assessment.user.toString() !== req.user._id.toString() && req.user.role !== 'admin' && req.user.role !== 'mentor') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(assessment);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch assessment' });
  }
};

module.exports = {
  runAssessment,
  getAssessmentHistory,
  getAssessmentById
};
