const express = require('express');
const router = express.Router();
const {
  getArtists,
  getArtistProfile,
  updateArtistProfile
} = require('../controllers/artistController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.get('/', getArtists);
router.get('/profile', protect, authorize('artist'), getArtistProfile);
router.put('/profile', protect, authorize('artist'), updateArtistProfile);

module.exports = router;