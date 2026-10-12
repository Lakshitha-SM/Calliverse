const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

describe('CalliLab Backend Module and Route Integrity Tests', () => {
  test('All critical controllers export required handler functions', () => {
    const authController = require('../controllers/authController');
    assert.strictEqual(typeof authController.registerUser, 'function');
    assert.strictEqual(typeof authController.loginUser, 'function');
    assert.strictEqual(typeof authController.getMe, 'function');

    const assessmentController = require('../controllers/assessmentController');
    assert.strictEqual(typeof assessmentController.runAssessment, 'function');
    assert.strictEqual(typeof assessmentController.getAssessmentHistory, 'function');

    const courseController = require('../controllers/courseController');
    assert.strictEqual(typeof courseController.getCourses, 'function');
    assert.strictEqual(typeof courseController.getCourseByIdOrSlug, 'function');

    const practiceController = require('../controllers/practiceController');
    assert.strictEqual(typeof practiceController.uploadImage, 'function');
    assert.strictEqual(typeof practiceController.savePracticeAttempt, 'function');
    assert.strictEqual(typeof practiceController.getPracticeAttempts, 'function');

    const coachController = require('../controllers/coachController');
    assert.strictEqual(typeof coachController.getPersonalizedRecommendations, 'function');
    assert.strictEqual(typeof coachController.askCalliCoach, 'function');
  });

  test('Auth middleware exports protect and authorize middlewares', () => {
    const { protect, authorize } = require('../middleware/authMiddleware');
    assert.strictEqual(typeof protect, 'function');
    assert.strictEqual(typeof authorize, 'function');
    const roleGate = authorize('admin', 'mentor');
    assert.strictEqual(typeof roleGate, 'function');
  });

  test('Mongoose schemas instantiate valid models without syntax errors', () => {
    const User = require('../models/User');
    assert.ok(User.schema, 'User schema defined');
    assert.ok(User.schema.paths.email, 'User has email field');
    assert.ok(User.schema.paths.role, 'User has role field');

    const AIAssessment = require('../models/AIAssessment');
    assert.ok(AIAssessment.schema, 'AIAssessment schema defined');

    const PracticeAttempt = require('../models/PracticeAttempt');
    assert.ok(PracticeAttempt.schema, 'PracticeAttempt schema defined');

    const Course = require('../models/Course');
    assert.ok(Course.schema, 'Course schema defined');
  });
});
