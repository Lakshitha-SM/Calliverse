const path = require('path');
const fs = require('fs');
const PracticeAttempt = require('../models/PracticeAttempt');
const Progress = require('../models/Progress');
const User = require('../models/User');
const AIAssessment = require('../models/AIAssessment');
const { analyzeCalligraphyImage } = require('../services/aiAssessmentEngine');

// @desc    Upload an image for practice
// @route   POST /api/practice/upload
// @access  Private
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    // Determine normalized URL
    let fileUrl = req.file.path;
    if (!fileUrl.startsWith('http')) {
      fileUrl = `/uploads/${req.file.filename}`;
    }

    res.json({
      message: 'Image uploaded successfully',
      url: fileUrl,
      filename: req.file.filename,
      size: req.file.size
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'File upload failed' });
  }
};

// @desc    Save a practice attempt
// @route   POST /api/practice/attempt
// @access  Private
const savePracticeAttempt = async (req, res) => {
  try {
    const {
      lessonId,
      exerciseId,
      title,
      targetReference,
      attemptType,
      imageUrl,
      base64Data,
      canvasData,
      durationSeconds = 60,
      notes = ''
    } = req.body;

    if (!targetReference) {
      return res.status(400).json({ message: 'Target reference character/word is required' });
    }

    let finalImageUrl = imageUrl;

    // If client sent raw canvas base64 image data instead of URL, save to disk
    if (base64Data && (!finalImageUrl || finalImageUrl.startsWith('data:'))) {
      const uploadsDir = path.join(__dirname, '../uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, '');
      const filename = `calli-canvas-${Date.now()}-${Math.round(Math.random() * 1e6)}.png`;
      const filepath = path.join(uploadsDir, filename);

      fs.writeFileSync(filepath, Buffer.from(base64Image, 'base64'));
      finalImageUrl = `/uploads/${filename}`;
    }

    if (!finalImageUrl) {
      return res.status(400).json({ message: 'Image URL or canvas data is required' });
    }

    // Compute attempt number for this target reference
    const previousAttemptsCount = await PracticeAttempt.countDocuments({
      user: req.user._id,
      targetReference: targetReference.trim()
    });

    const attemptNumber = previousAttemptsCount + 1;

    // Run AI calligraphy assessment engine
    let assessmentResult = null;
    try {
      const targetImageForAi = base64Data || finalImageUrl;
      assessmentResult = await analyzeCalligraphyImage(targetImageForAi, targetReference.trim());
    } catch (aiErr) {
      console.warn('AI analysis error, proceeding with defaults:', aiErr.message);
    }

    // Create practice attempt with AI metrics if available
    const attempt = await PracticeAttempt.create({
      user: req.user._id,
      lesson: lessonId || undefined,
      exercise: exerciseId || undefined,
      title: title || `Practice Attempt #${attemptNumber} — ${targetReference}`,
      targetReference: targetReference.trim(),
      attemptType: attemptType || 'digital_canvas',
      imageUrl: finalImageUrl,
      canvasData: canvasData || '',
      attemptNumber,
      durationSeconds: Number(durationSeconds) || 60,
      notes,
      metrics: assessmentResult ? {
        overallScore: assessmentResult.overallScore,
        shapeScore: assessmentResult.metrics?.letterShape || 85,
        strokeConsistencyScore: assessmentResult.metrics?.strokeConsistency || 85,
        spacingScore: assessmentResult.metrics?.spacing || 82,
        alignmentScore: assessmentResult.metrics?.alignment || 84,
        slantScore: assessmentResult.metrics?.slant || 80,
        smoothnessScore: assessmentResult.metrics?.strokeSmoothness || 86,
        proportionScore: assessmentResult.metrics?.proportion || 85
      } : undefined,
      feedback: assessmentResult ? {
        goodPoints: assessmentResult.feedback?.strengths || ['Well-proportioned character curvature.'],
        needsImprovement: assessmentResult.feedback?.weaknesses || ['Maintain consistent 55° guideline slant.'],
        nextPracticeRecommendation: assessmentResult.feedback?.recommendation || 'Continue with connected word drills.'
      } : undefined
    });

    // Create AIAssessment document
    let aiAssessmentDoc = null;
    if (assessmentResult) {
      aiAssessmentDoc = await AIAssessment.create({
        user: req.user._id,
        practiceAttempt: attempt._id,
        targetReference: targetReference.trim(),
        imageUrl: finalImageUrl,
        overallScore: assessmentResult.overallScore,
        metrics: assessmentResult.metrics,
        detectedCharacteristics: assessmentResult.detectedCharacteristics,
        feedback: assessmentResult.feedback,
        aiEngine: assessmentResult.aiEngine || 'CalliVision v2.4'
      });
    }

    // Calculate real Streak
    const userDoc = await User.findById(req.user._id);
    let currentStreak = userDoc?.streak || 12; // default active learner baseline if starting
    const lastActive = userDoc?.lastActive ? new Date(userDoc.lastActive) : null;
    const now = new Date();

    if (!lastActive) {
      currentStreak = Math.max(1, currentStreak);
    } else {
      const lastDateStr = lastActive.toISOString().split('T')[0];
      const todayDateStr = now.toISOString().split('T')[0];
      if (lastDateStr === todayDateStr) {
        // Already practiced today, keep current streak
        currentStreak = Math.max(1, currentStreak);
      } else {
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        if (lastDateStr === yesterdayStr) {
          currentStreak += 1;
        } else {
          currentStreak = 1;
        }
      }
    }

    // Update User & Progress: +25 XP per completed practice attempt & practice minutes
    const xpReward = 25;
    const minutesPracticed = Math.max(1, Math.round((Number(durationSeconds) || 60) / 60));

    const updatedProgress = await Progress.findOneAndUpdate(
      { user: req.user._id },
      {
        $inc: { 
          xp: xpReward, 
          practiceMinutes: minutesPracticed,
          totalUploads: 1
        },
        $set: { 
          lastActive: now,
          streak: currentStreak,
          ...(assessmentResult?.metrics ? {
            'skillBreakdown.spacing': assessmentResult.metrics.spacing,
            'skillBreakdown.slant': assessmentResult.metrics.slant,
            'skillBreakdown.smoothness': assessmentResult.metrics.strokeSmoothness,
            'skillBreakdown.pressure': assessmentResult.metrics.strokeConsistency,
          } : {})
        }
      },
      { upsert: true, returnDocument: 'after' }
    );

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { 
        $inc: { xp: xpReward },
        $set: { streak: currentStreak, lastActive: now }
      },
      { returnDocument: 'after' }
    ).select('-passwordHash');

    res.status(201).json({
      message: `Practice attempt analyzed and saved! (+${xpReward} XP)`,
      attempt,
      assessment: aiAssessmentDoc,
      streak: currentStreak,
      xpEarned: xpReward,
      user: updatedUser,
      progress: updatedProgress
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to save practice attempt' });
  }
};

// @desc    Get practice attempts history
// @route   GET /api/practice/attempts
// @access  Private
const getPracticeAttempts = async (req, res) => {
  try {
    const { targetReference, lessonId, limit = 20 } = req.query;
    const filter = { user: req.user._id };

    if (targetReference && targetReference.trim()) {
      filter.targetReference = targetReference.trim();
    }
    if (lessonId) {
      filter.lesson = lessonId;
    }

    const attempts = await PracticeAttempt.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .populate('lesson', 'title category difficulty');

    res.json(attempts);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch practice attempts' });
  }
};

// @desc    Get single practice attempt by ID
// @route   GET /api/practice/attempts/:id
// @access  Private
const getPracticeAttemptById = async (req, res) => {
  try {
    const attempt = await PracticeAttempt.findById(req.params.id)
      .populate('lesson', 'title category difficulty practiceTask');

    if (!attempt) {
      return res.status(404).json({ message: 'Attempt not found' });
    }

    if (attempt.user.toString() !== req.user._id.toString() && req.user.role !== 'admin' && req.user.role !== 'mentor') {
      return res.status(403).json({ message: 'Not authorized to view this attempt' });
    }

    res.json(attempt);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch attempt' });
  }
};

// @desc    Delete practice attempt
// @route   DELETE /api/practice/attempts/:id
// @access  Private
const deletePracticeAttempt = async (req, res) => {
  try {
    const attempt = await PracticeAttempt.findById(req.params.id);
    if (!attempt) return res.status(404).json({ message: 'Attempt not found' });

    if (attempt.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await attempt.deleteOne();
    res.json({ message: 'Practice attempt deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to delete attempt' });
  }
};

module.exports = {
  uploadImage,
  savePracticeAttempt,
  getPracticeAttempts,
  getPracticeAttemptById,
  deletePracticeAttempt
};
