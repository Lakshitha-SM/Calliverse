const Progress = require('../models/Progress');

const getProgress = async (req, res) => {
  let progress = await Progress.findOne({ user: req.user._id });
  if (!progress) progress = await Progress.create({ user: req.user._id });
  res.json(progress);
};

const updateProgress = async (req, res) => {
  const progress = await Progress.findOneAndUpdate(
    { user: req.user._id },
    { $set: req.body },
    { new: true, upsert: true }
  );
  res.json(progress);
};

const completeLesson = async (req, res) => {
  const { lessonId, title } = req.body;
  const progress = await Progress.findOneAndUpdate(
    { user: req.user._id },
    { $addToSet: { lessonsCompleted: { lessonId, title, completedAt: new Date() } }, $inc: { xp: 50 } },
    { new: true, upsert: true }
  );
  res.json(progress);
};

const getDailyChallenges = async (req, res) => {
  const challenges = [
    { title: 'Practice 10 minutes', description: 'Open the canvas and practice for 10 minutes', completed: false },
    { title: 'Upload your work', description: 'Share your latest creation to the community', completed: false },
    { title: 'Try a new style', description: 'Practice Gothic calligraphy today', completed: false },
  ];
  res.json(challenges);
};

module.exports = { getProgress, updateProgress, completeLesson, getDailyChallenges };
