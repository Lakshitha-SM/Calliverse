const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getDesigns, getDesignById, createDesign, updateDesign, deleteDesign } = require('../controllers/designController');

router.get('/', protect, getDesigns);
router.post('/', protect, createDesign);
router.get('/:id', protect, getDesignById);
router.put('/:id', protect, updateDesign);
router.delete('/:id', protect, deleteDesign);

module.exports = router;
