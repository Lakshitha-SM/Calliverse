const Course = require('../models/Course');
const Lesson = require('../models/Lesson');

// @desc    Get all courses with optional category & search filter
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = { isPublished: true };

    if (category && category !== 'all') {
      filter.category = category.toLowerCase();
    }

    if (search && search.trim()) {
      filter.$or = [
        { title: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
        { tags: { $in: [new RegExp(search.trim(), 'i')] } }
      ];
    }

    const courses = await Course.find(filter)
      .populate('lessons', 'title slug moduleName difficulty estimatedMinutes order')
      .sort({ order: 1, createdAt: 1 });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch courses' });
  }
};

// @desc    Get single course by ID or slug
// @route   GET /api/courses/:idOrSlug
// @access  Public
const getCourseByIdOrSlug = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let course;

    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      course = await Course.findById(idOrSlug).populate({
        path: 'lessons',
        populate: { path: 'exercises' }
      });
    } else {
      course = await Course.findOne({ slug: idOrSlug }).populate({
        path: 'lessons',
        populate: { path: 'exercises' }
      });
    }

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch course details' });
  }
};

// @desc    Create new course
// @route   POST /api/courses
// @access  Private (Mentor / Admin)
const createCourse = async (req, res) => {
  try {
    const { title, slug, subtitle, description, category, level, style, thumbnailUrl, estimatedHours, tags, learningOutcomes } = req.body;
    
    const courseSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const course = await Course.create({
      title,
      slug: courseSlug,
      subtitle,
      description,
      category: category || 'beginner',
      level: level || 'Beginner',
      style: style || 'Modern Calligraphy',
      thumbnailUrl: thumbnailUrl || '',
      estimatedHours: estimatedHours || 3,
      tags: tags || [],
      learningOutcomes: learningOutcomes || [],
      instructor: req.user._id,
      instructorName: req.user.name
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to create course' });
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (Mentor / Admin)
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Ensure only instructor or admin can update
    if (req.user.role !== 'admin' && course.instructor?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to modify this course' });
    }

    Object.assign(course, req.body);
    await course.save();
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to update course' });
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (Admin)
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    await course.deleteOne();
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to delete course' });
  }
};

module.exports = {
  getCourses,
  getCourseByIdOrSlug,
  createCourse,
  updateCourse,
  deleteCourse
};
