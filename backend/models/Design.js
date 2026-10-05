const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: 'Untitled Design' },
  canvasJSON: { type: String, default: '{}' },
  thumbnailUrl: { type: String, default: '' },
  category: { type: String, enum: ['poster', 'invitation', 'card', 'signature', 'logo', 'practice', 'other'], default: 'other' },
  tags: [{ type: String }],
  isPublic: { type: Boolean, default: false },
  qrCode: { type: String, default: '' },
  shareLink: { type: String, default: '' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
  width: { type: Number, default: 800 },
  height: { type: Number, default: 600 },
}, { timestamps: true });

module.exports = mongoose.model('Design', designSchema);
