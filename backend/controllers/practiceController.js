const path = require('path');
const fs = require('fs');
const PracticeAttempt = require('../models/PracticeAttempt');
const Progress = require('../models/Progress');
const User = require('../models/User');

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

    // Create practice attempt
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
      notes
    });

    // Update User & Progress: +10 XP per practice attempt & practice minutes
    const xpReward = 10;
    const minutesPracticed = Math.max(1, Math.round((Number(durationSeconds) || 60) / 60));

    await Progress.findOneAndUpdate(
      { user: req.user._id },
      {
        $inc: { 
          xp: xpReward, 
          practiceMinutes: minutesPracticed,
          totalUploads: 1
        },
        $set: { lastActive: new Date() }
      },
      { upsert: true, new: true }
    );

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $inc: { xp: xpReward } },
      { new: true }
    ).select('-passwordHash');

    res.status(201).json({
      message: `Practice attempt saved successfully! (+${xpReward} XP)`,
      attempt,
      attemptNumber,
      user: updatedUser
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
