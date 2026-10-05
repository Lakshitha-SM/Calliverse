const Exercise = require('../models/Exercise');
const Lesson = require('../models/Lesson');

// @desc    Get exercises with optional lessonId or category
// @route   GET /api/exercises
// @access  Public
const getExercises = async (req, res) => {
  try {
    const { lessonId, category } = req.query;
    const filter = {};

    if (lessonId) filter.lesson = lessonId;
    if (category && category !== 'all') filter.category = category.toLowerCase();

    const exercises = await Exercise.find(filter)
      .populate('lesson', 'title slug category')
      .sort({ order: 1, createdAt: 1 });

    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch exercises' });
  }
};

// @desc    Get single exercise by ID
// @route   GET /api/exercises/:id
// @access  Public
const getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id)
      .populate('lesson', 'title slug category difficulty practiceTask');

    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    res.json(exercise);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch exercise' });
  }
};

// @desc    Create new exercise
// @route   POST /api/exercises
// @access  Private (Mentor / Admin)
const createExercise = async (req, res) => {
  try {
    const { lessonId, title, targetCharacter, category, difficulty, focusArea, strokeSteps, guidelineConfig, estimatedMinutes, targetScore } = req.body;

    const exercise = await Exercise.create({
      lesson: lessonId,
      title,
      targetCharacter,
      category: category || 'beginner',
      difficulty: difficulty || 'easy',
      focusArea: focusArea || 'stroke consistency',
      strokeSteps: strokeSteps || [],
      guidelineConfig: guidelineConfig || { hasBaseline: true, hasXHeight: true, slantAngle: 55 },
      estimatedMinutes: estimatedMinutes || 10,
      targetScore: targetScore || 80
    });

    if (lessonId) {
      await Lesson.findByIdAndUpdate(lessonId, { $addToSet: { exercises: exercise._id } });
    }

    res.status(201).json(exercise);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to create exercise' });
  }
};

module.exports = {
  getExercises,
  getExerciseById,
  createExercise
};
