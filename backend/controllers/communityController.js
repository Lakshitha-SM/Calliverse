const Post = require('../models/Post');

const getFeed = async (req, res) => {
  const { mood, page = 1 } = req.query;
  const filter = mood && mood !== 'all' ? { mood } : {};
  const posts = await Post.find(filter)
    .populate('author', 'name avatar')
    .sort({ createdAt: -1 })
    .limit(20)
    .skip((page - 1) * 20);
  res.json(posts);
};

const createPost = async (req, res) => {
  const { imageUrl, caption, tags, mood, style } = req.body;
  const post = await Post.create({ author: req.user._id, imageUrl, caption, tags, mood, style });
  await post.populate('author', 'name avatar');
  res.status(201).json(post);
};

const likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Not found' });
  const idx = post.likes.indexOf(req.user._id);
  if (idx === -1) post.likes.push(req.user._id);
  else post.likes.splice(idx, 1);
  await post.save();
  res.json({ likes: post.likes.length });
};

const commentPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Not found' });
  post.comments.push({ user: req.user._id, text: req.body.text });
  await post.save();
  res.json(post.comments);
};

const bookmarkPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Not found' });
  const idx = post.bookmarks.indexOf(req.user._id);
  if (idx === -1) post.bookmarks.push(req.user._id);
  else post.bookmarks.splice(idx, 1);
  await post.save();
  res.json({ bookmarked: idx === -1 });
};

module.exports = { getFeed, createPost, likePost, commentPost, bookmarkPost };
