const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { analyzeCalligraphyImage } = require('../services/aiAssessmentEngine');

describe('CalliVision AI Assessment Engine Tests', () => {
  test('Engine returns valid score object structure for character "a"', async () => {
    // Provide a valid base64 1x1 test image or fallback token
    const testImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    const result = await analyzeCalligraphyImage(testImage, 'a');

    assert.ok(result, 'Result should be defined');
    assert.strictEqual(typeof result.overallScore, 'number', 'Overall score must be a number');
    assert.ok(result.overallScore >= 0 && result.overallScore <= 100, 'Score must be between 0 and 100');
    assert.ok(result.aiEngine.includes('CalliVision'), 'Engine signature must match CalliVision');
  });

  test('Multi-metric dimensions are calculated within valid ranges', async () => {
    const testImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    const result = await analyzeCalligraphyImage(testImage, 'm');

    const metrics = result.metrics;
    assert.ok(metrics, 'Metrics object must be present');
    assert.ok(metrics.shapeScore >= 60 && metrics.shapeScore <= 100, 'Shape score in valid bounds');
    assert.ok(metrics.strokeConsistency >= 60 && metrics.strokeConsistency <= 100, 'Stroke consistency in valid bounds');
    assert.ok(metrics.spacing >= 60 && metrics.spacing <= 100, 'Spacing score in valid bounds');
    assert.ok(metrics.alignment >= 60 && metrics.alignment <= 100, 'Alignment score in valid bounds');
    assert.ok(metrics.slant >= 60 && metrics.slant <= 100, 'Slant score in valid bounds');
    assert.ok(metrics.strokeSmoothness >= 60 && metrics.strokeSmoothness <= 100, 'Stroke smoothness in valid bounds');
  });

  test('Feedback structure provides positive observations and prescriptive drills', async () => {
    const testImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    const result = await analyzeCalligraphyImage(testImage, 'autumn');

    assert.ok(Array.isArray(result.feedback.goodPoints), 'goodPoints must be an array');
    assert.ok(result.feedback.goodPoints.length > 0, 'Must have at least one strength point');
    assert.ok(Array.isArray(result.feedback.needsImprovement), 'needsImprovement must be an array');
    assert.ok(result.feedback.needsImprovement.length > 0, 'Must have at least one improvement point');
    assert.strictEqual(typeof result.feedback.nextPracticeRecommendation, 'string', 'Recommendation must be a string');
    assert.ok(result.feedback.nextPracticeRecommendation.length > 10, 'Recommendation must be descriptive');
  });

  test('Detected physical characteristics adhere to calligraphy standards', async () => {
    const testImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    const result = await analyzeCalligraphyImage(testImage, 'b');

    const chars = result.detectedCharacteristics;
    assert.ok(chars, 'Characteristics object must exist');
    assert.ok(chars.estimatedSlantAngle >= 45 && chars.estimatedSlantAngle <= 65, 'Estimated slant is near 55 degrees');
    assert.ok(chars.strokeThicknessRatio > 1.0, 'Downstroke/upstroke contrast must be greater than 1');
  });
});
