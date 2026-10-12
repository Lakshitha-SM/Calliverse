import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

describe('Frontend Calligraphy Skill Radar Geometry Tests', () => {
  const total = 5;
  const size = 220;
  const center = size / 2;
  const radius = (size / 2) - 30;

  const getCoordinates = (index, value) => {
    const angle = (Math.PI * 2 / total) * index - (Math.PI / 2);
    const distance = (value / 100) * radius;
    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle)
    };
  };

  test('Center point calculation is correct', () => {
    assert.strictEqual(center, 110);
    assert.strictEqual(radius, 80);
  });

  test('Origin point (0% skill) coincides with center', () => {
    const coords = getCoordinates(0, 0);
    assert.ok(Math.abs(coords.x - center) < 0.001);
    assert.ok(Math.abs(coords.y - center) < 0.001);
  });

  test('Peak point (100% skill) at index 0 points directly upward (-y)', () => {
    const coords = getCoordinates(0, 100);
    assert.ok(Math.abs(coords.x - center) < 0.001);
    assert.ok(coords.y < center, 'Y coordinate should be above center');
    assert.ok(Math.abs(coords.y - (center - radius)) < 0.001);
  });

  test('Multi-axis polygon coordinates generated for all 5 dimensions', () => {
    const skills = { slant: 80, pressure: 85, smoothness: 78, spacing: 72, alignment: 88 };
    const values = [skills.slant, skills.pressure, skills.smoothness, skills.spacing, skills.alignment];
    const points = values.map((val, i) => getCoordinates(i, val));

    assert.strictEqual(points.length, 5);
    points.forEach((p, idx) => {
      assert.ok(typeof p.x === 'number' && !isNaN(p.x), `X point ${idx} must be a number`);
      assert.ok(typeof p.y === 'number' && !isNaN(p.y), `Y point ${idx} must be a number`);
      assert.ok(p.x >= 0 && p.x <= size, `X point ${idx} within canvas boundaries`);
      assert.ok(p.y >= 0 && p.y <= size, `Y point ${idx} within canvas boundaries`);
    });
  });
});
