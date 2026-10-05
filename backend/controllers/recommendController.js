const User = require('../models/User');

const getRecommendations = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { skillLevel, preferredStyles, interests } = user;

  const tutorials = {
    beginner: [
      { id: 1, title: 'Brush Lettering Basics', type: 'tutorial', duration: '15 min', style: 'brush' },
      { id: 2, title: 'Gothic Alphabet A-Z', type: 'tutorial', duration: '20 min', style: 'gothic' },
      { id: 3, title: 'Basic Strokes & Pressure', type: 'tutorial', duration: '10 min', style: 'general' },
    ],
    intermediate: [
      { id: 4, title: 'Modern Script Flourishes', type: 'tutorial', duration: '25 min', style: 'modern' },
      { id: 5, title: 'Composition & Layout', type: 'tutorial', duration: '30 min', style: 'general' },
    ],
    advanced: [
      { id: 6, title: 'Signature Design Mastery', type: 'tutorial', duration: '40 min', style: 'signature' },
      { id: 7, title: 'Wedding Invitation Calligraphy', type: 'tutorial', duration: '45 min', style: 'elegant' },
    ],
  };

  const brushes = [
    { name: 'Tombow Dual Brush Pen', type: 'brush pen', bestFor: ['brush lettering', 'modern'], level: 'beginner' },
    { name: 'Pilot Parallel Pen', type: 'parallel pen', bestFor: ['gothic', 'italic'], level: 'intermediate' },
    { name: 'Nikko G Nib', type: 'dip pen nib', bestFor: ['copperplate', 'pointed pen'], level: 'advanced' },
    { name: 'Pentel Fude Touch', type: 'sign pen', bestFor: ['modern script', 'casual'], level: 'beginner' },
  ];

  const templates = [
    { id: 1, title: 'Wedding Invitation', category: 'invitation', style: 'elegant' },
    { id: 2, title: 'Quote Poster', category: 'poster', style: 'modern' },
    { id: 3, title: 'Birthday Card', category: 'card', style: 'festive' },
    { id: 4, title: 'Logo Design', category: 'logo', style: 'minimal' },
  ];

  res.json({
    tutorials: tutorials[skillLevel] || tutorials.beginner,
    brushes: brushes.filter(b => b.level === skillLevel || b.level === 'beginner'),
    templates,
    dailyChallenge: 'Practice the letter "O" in 5 different calligraphy styles today!',
  });
};

const getMoodInspiration = async (req, res) => {
  const { mood } = req.query;
  const inspirations = {
    elegant: { colors: ['#C9A96E', '#F5F0E8', '#2C2C2C'], fonts: ['Cormorant Garamond', 'IM Fell English'] },
    romantic: { colors: ['#E8B4B8', '#F7E7E9', '#8B1A4A'], fonts: ['Dancing Script', 'Great Vibes'] },
    dark: { colors: ['#1A1A2E', '#16213E', '#E94560'], fonts: ['UnifrakturMaguntia', 'MedievalSharp'] },
    festive: { colors: ['#FFD700', '#FF6B35', '#004E89'], fonts: ['Pacifico', 'Lobster'] },
    minimal: { colors: ['#FFFFFF', '#F5F5F5', '#333333'], fonts: ['Raleway', 'Montserrat'] },
  };
  res.json(inspirations[mood] || inspirations.elegant);
};

module.exports = { getRecommendations, getMoodInspiration };
