const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Rotas para gerenciamento dos artistas
router.get('/', artistController.getArtists);
router.get('/profile', artistController.getArtistProfile); // protect, authorize('artist')
router.put('/profile', artistController.updateArtistProfile); // protect, authorize('artist')

module.exports = router;



