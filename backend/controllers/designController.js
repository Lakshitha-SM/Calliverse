const Design = require('../models/Design');

const getDesigns = async (req, res) => {
  const designs = await Design.find({ owner: req.user._id }).sort({ updatedAt: -1 });
  res.json(designs);
};

const getDesignById = async (req, res) => {
  const design = await Design.findById(req.params.id);
  if (!design) return res.status(404).json({ message: 'Design not found' });
  if (!design.isPublic && design.owner.toString() !== req.user._id.toString())
    return res.status(403).json({ message: 'Not authorized' });
  res.json(design);
};

const createDesign = async (req, res) => {
  const { title, canvasJSON, thumbnailUrl, category, tags, isPublic, width, height } = req.body;
  const shareLink = `${process.env.CLIENT_URL}/artwork/${Date.now()}`;
  const design = await Design.create({
    owner: req.user._id, title, canvasJSON, thumbnailUrl,
    category, tags, isPublic, width, height, shareLink,
  });
  res.status(201).json(design);
};

const updateDesign = async (req, res) => {
  const design = await Design.findById(req.params.id);
  if (!design) return res.status(404).json({ message: 'Not found' });
  if (design.owner.toString() !== req.user._id.toString())
    return res.status(403).json({ message: 'Not authorized' });
  Object.assign(design, req.body);
  await design.save();
  res.json(design);
};

const deleteDesign = async (req, res) => {
  const design = await Design.findById(req.params.id);
  if (!design) return res.status(404).json({ message: 'Not found' });
  if (design.owner.toString() !== req.user._id.toString())
    return res.status(403).json({ message: 'Not authorized' });
  await design.deleteOne();
  res.json({ message: 'Deleted' });
};

module.exports = { getDesigns, getDesignById, createDesign, updateDesign, deleteDesign };
