const User = require('../models/User');
const Progress = require('../models/Progress');
const AIAssessment = require('../models/AIAssessment');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');

// @desc    Get AI Personalized Recommendations based on user history
// @route   GET /api/coach/recommendations
// @access  Private
const getPersonalizedRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const progress = await Progress.findOne({ user: req.user._id });
    const latestAssessments = await AIAssessment.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5);

    // Extract skill breakdown
    const skills = progress?.skillBreakdown || {
      spacing: 76,
      slant: 85,
      smoothness: 82,
      pressure: 80
    };

    // Determine weakest & strongest skill
    const skillEntries = Object.entries(skills);
    skillEntries.sort((a, b) => a[1] - b[1]);
    const weakest = skillEntries[0] || ['spacing', 74];
    const strongest = skillEntries[skillEntries.length - 1] || ['slant', 88];

    // Compute tailored recommendations
    let nextBestLesson = {
      title: 'Basic Strokes & Pressure Control',
      slug: 'basic-strokes-and-pressure-control',
      reason: 'Strengthen core pen control and line contrast.'
    };

    if (weakest[0] === 'spacing') {
      nextBestLesson = {
        title: 'Letter Connections & Rhythm Spacing',
        slug: 'letter-connections-and-spacing',
        reason: 'Your spacing score is currently lower than other areas. This drill will calibrate inter-letter optical volume.'
      };
    } else if (weakest[0] === 'slant') {
      nextBestLesson = {
        title: 'Fundamentals of Brush Slanting',
        slug: 'basic-strokes-and-pressure-control',
        reason: 'Improve adherence to standard 55° diagonal guidelines.'
      };
    } else if (weakest[0] === 'pressure') {
      nextBestLesson = {
        title: 'Basic Strokes & Pressure Control',
        slug: 'basic-strokes-and-pressure-control',
        reason: 'Increase contrast between hairline upstrokes and shaded downstrokes.'
      };
    } else if (user?.skillLevel === 'intermediate') {
      nextBestLesson = {
        title: 'Ascender & Descender Flourishing Rules',
        slug: 'ascender-and-descender-flourishing',
        reason: 'Expand from basic words into expressive script flourishes.'
      };
    }

    const recommendedDrills = [
      {
        task: `10-minute focus on ${weakest[0]} calibration`,
        reference: weakest[0] === 'spacing' ? 'minimum' : weakest[0] === 'slant' ? '/' : 'a',
        targetScore: 85
      },
      {
        task: 'Consistency drill: 3 repetitions of lowercase ovals',
        reference: 'o',
        targetScore: 82
      }
    ];

    res.json({
      skillLevel: user?.skillLevel || 'beginner',
      weakArea: { skill: weakest[0], score: weakest[1] },
      strongArea: { skill: strongest[0], score: strongest[1] },
      nextBestLesson,
      recommendedDrills,
      summary: `Your ${weakest[0]} score (${weakest[1]}%) needs focused attention, while your ${strongest[0]} (${strongest[1]}%) is currently your strongest attribute.`
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to generate recommendations' });
  }
};

// @desc    Ask CalliCoach (AI Calligraphy Coach assistant)
// @route   POST /api/coach/ask
// @access  Private
const askCalliCoach = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ message: 'Please provide a question for CalliCoach' });
    }

    const user = await User.findById(req.user._id);
    const progress = await Progress.findOne({ user: req.user._id });
    const latestAssessment = await AIAssessment.findOne({ user: req.user._id }).sort({ createdAt: -1 });

    const q = prompt.toLowerCase();
    const userName = user?.name || 'Artist';
    const skillLevel = user?.skillLevel || 'beginner';
    const streak = user?.streak || progress?.streak || 4;
    const avgScore = latestAssessment?.overallScore || 84;
    const spacingScore = progress?.skillBreakdown?.spacing || latestAssessment?.metrics?.spacing || 76;
    const slantScore = progress?.skillBreakdown?.slant || latestAssessment?.metrics?.slant || 85;

    let reply = '';

    // Smart contextual responses grounded in real user stats
    if (q.includes('spacing') || q.includes('space') || q.includes('why is my spacing bad')) {
      reply = `Hello ${userName}! Based on your latest practice assessments, your spacing score is currently at **${spacingScore}/100**.\n\n` +
        `**Why Spacing Issues Happen:**\n` +
        `1. **Uneven Exit Strokes:** If your upward connecting strokes terminate too early, letters bunch together.\n` +
        `2. **Optical Volume Disparity:** Round letters like "o", "c", and "e" require slightly tighter spacing, whereas straight stems like "n", "m", and "u" require equal width to their inner counters.\n\n` +
        `**My Coaching Prescription:**\n` +
        `→ Open the Practice Lab with target word **"minimum"**.\n` +
        `→ Keep the space between each vertical minim stroke identical to the stroke thickness.\n` +
        `→ Dedicate 10 minutes today to maintain rhythmic spacing!`;
    } else if (q.includes('stroke') || q.includes('improve my stroke') || q.includes('pressure')) {
      reply = `Hi ${userName}! Clean strokes depend on the principle of contrasting weight.\n\n` +
        `**Key Technique Rules:**\n` +
        `• **Hairline Upstrokes:** Hold your pen at a 45° angle. Glide upward using only the feather-weight of the nib—never press down while moving upward.\n` +
        `• **Shaded Downstrokes:** Pause at the peak for a split-second, plant your nib securely, and pull straight down with steady forearm movement.\n` +
        `• **Release Timing:** Lift your pressure 2mm *before* reaching the baseline to avoid ink pooling at the base.\n\n` +
        `Your stroke consistency score is around **${progress?.skillBreakdown?.pressure || 80}/100**. Try the "Basic Strokes & Pressure Control" lesson in your Learning Paths!`;
    } else if (q.includes('7-day') || q.includes('plan') || q.includes('routine')) {
      reply = `Here is your customized **7-Day Calligraphy Mastery Plan** tailored for your **${skillLevel.toUpperCase()}** level:\n\n` +
        `• **Day 1: Pressure Calibration** — 10 mins vertical downstrokes & hairline upstrokes.\n` +
        `• **Day 2: Oval Symmetry** — 15 mins ovals ('o', 'c', 'e') along the 55° slant guide.\n` +
        `• **Day 3: Stem Letters** — 15 mins lowercase 'i', 't', 'l', 'u' with baseline precision.\n` +
        `• **Day 4: Complex Connections** — 15 mins practice on "or", "ve", and "minimum".\n` +
        `• **Day 5: Uppercase Capitals** — 15 mins on initials & entrance flourishes.\n` +
        `• **Day 6: Full Word Composition** — 20 mins writing short quotes like "Breathe" and "Grace".\n` +
        `• **Day 7: AI Assessment & Portfolio** — Upload your best attempt for AI scoring and save to your digital showcase!\n\n` +
        `Consistent 15 minutes a day will keep your **${streak}-day streak** burning bright 🔥!`;
    } else if (q.includes('style') || q.includes('which style')) {
      reply = `Choosing the right calligraphy style depends on your creative goals, ${userName}:\n\n` +
        `1. **Modern Brush Script (Recommended):** Perfect for greeting cards, quotes, and relaxed casual lettering. High flexibility and beginner-friendly.\n` +
        `2. **Chancery Italic / Copperplate:** Best for formal wedding invitations, historical certificates, and classic luxury stationary.\n` +
        `3. **Gothic / Blackletter:** Incredible for dramatic quote posters, monograms, and medieval manuscript aesthetics.\n\n` +
        `Based on your profile, I recommend starting with **Modern Brush Script** to master pressure control before tackling pointed pen copperplate!`;
    } else if (q.includes('today') || q.includes('what should i practice')) {
      reply = `For today's drill, ${userName}:\n\n` +
        `**Today's Personalized Task:**\n` +
        `🎯 **Target:** Practice lowercase **"a"**, **"n"**, and **"o"**.\n` +
        `⏱️ **Time:** ${user?.dailyPracticeTarget || 15} Minutes.\n` +
        `🔍 **Primary Focus:** Baseline alignment (current score: ${slantScore}%).\n` +
        `⭐ **Goal:** Achieve an AI assessment score of **80+**!\n\n` +
        `Head over to the **Practice Lab** and switch on the 55° slant guidelines to begin!`;
    } else {
      reply = `Greetings ${userName}! As your CalliCoach, I'm analyzing your current progress (**${skillLevel}** level, **${avgScore}/100** average assessment score, **${streak}-day streak**).\n\n` +
        `To maximize your skill development:\n` +
        `1. Practice with intent: Always trace against the guidelines first to program muscle memory.\n` +
        `2. Inspect your posture: Keep your feet flat, sit upright, and rotate your paper 30-40 degrees so your forearm naturally aligns with the 55° slant.\n` +
        `3. Submit your daily attempts to our AI engine to receive instant feedback on shape, slant, and spacing.\n\n` +
        `What specific letter or technique would you like advice on today?`;
    }

    res.json({
      reply,
      userMetrics: {
        skillLevel,
        avgScore,
        streak,
        weakestSkill: spacingScore < slantScore ? 'spacing' : 'slant'
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'CalliCoach error' });
  }
};

module.exports = {
  getPersonalizedRecommendations,
  askCalliCoach
};
