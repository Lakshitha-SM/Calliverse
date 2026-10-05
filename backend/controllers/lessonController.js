const Lesson = require('../models/Lesson');
const Course = require('../models/Course');
const Progress = require('../models/Progress');
const User = require('../models/User');

// @desc    Get lessons with optional courseId or category filter
// @route   GET /api/lessons
// @access  Public
const getLessons = async (req, res) => {
  try {
    const { courseId, category } = req.query;
    const filter = { isPublished: true };

    if (courseId) filter.course = courseId;
    if (category && category !== 'all') filter.category = category.toLowerCase();

    const lessons = await Lesson.find(filter)
      .populate('exercises', 'title targetCharacter difficulty focusArea')
      .sort({ order: 1, createdAt: 1 });

    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch lessons' });
  }
};

// @desc    Get single lesson by ID or slug
// @route   GET /api/lessons/:idOrSlug
// @access  Public
const getLessonByIdOrSlug = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let lesson;

    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      lesson = await Lesson.findById(idOrSlug)
        .populate('course', 'title slug category level')
        .populate('exercises');
    } else {
      lesson = await Lesson.findOne({ slug: idOrSlug })
        .populate('course', 'title slug category level')
        .populate('exercises');
    }

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch lesson' });
  }
};

// @desc    Create a new lesson
// @route   POST /api/lessons
// @access  Private (Mentor / Admin)
const createLesson = async (req, res) => {
  try {
    const { courseId, title, slug, category, moduleName, difficulty, estimatedMinutes, learningObjectives, explanation, demonstration, practiceTask } = req.body;

    const lessonSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const lesson = await Lesson.create({
      course: courseId,
      title,
      slug: lessonSlug,
      category: category || 'beginner',
      moduleName: moduleName || 'General Practice',
      difficulty: difficulty || 'easy',
      estimatedMinutes: estimatedMinutes || 15,
      learningObjectives: learningObjectives || [],
      explanation,
      demonstration: demonstration || {},
      practiceTask: practiceTask || { taskPrompt: 'Practice this lesson', referenceLetterOrWord: 'A' }
    });

    if (courseId) {
      await Course.findByIdAndUpdate(courseId, { $addToSet: { lessons: lesson._id } });
    }

    res.status(201).json(lesson);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to create lesson' });
  }
};

// @desc    Update lesson
// @route   PUT /api/lessons/:id
// @access  Private (Mentor / Admin)
const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

    Object.assign(lesson, req.body);
    await lesson.save();
    res.json(lesson);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to update lesson' });
  }
};

// @desc    Mark lesson as completed & award +20 XP
// @route   POST /api/lessons/:id/complete
// @access  Private
const completeLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

    // Find or create progress
    let progress = await Progress.findOne({ user: req.user._id });
    if (!progress) {
      progress = await Progress.create({ user: req.user._id });
    }

    // Check if already completed
    const alreadyCompleted = progress.lessonsCompleted?.some(
      (item) => item.lessonId === lesson._id.toString()
    );

    const xpEarned = alreadyCompleted ? 5 : 20;

    // Update progress
    progress = await Progress.findOneAndUpdate(
      { user: req.user._id },
      {
        $addToSet: {
          lessonsCompleted: {
            lessonId: lesson._id.toString(),
            title: lesson.title,
            completedAt: new Date()
          }
        },
        $inc: { 
          xp: xpEarned,
          practiceMinutes: lesson.estimatedMinutes || 15
        },
        $set: { lastActive: new Date() }
      },
      { new: true, upsert: true }
    );

    // Also update User model xp
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $inc: { xp: xpEarned } },
      { new: true }
    ).select('-passwordHash');

    res.json({
      message: alreadyCompleted ? 'Lesson repeated! (+5 XP)' : 'Lesson completed successfully! (+20 XP)',
      xpEarned,
      progress,
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to record lesson completion' });
  }
};

module.exports = {
  getLessons,
  getLessonByIdOrSlug,
  createLesson,
  updateLesson,
  completeLesson
};
