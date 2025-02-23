const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Opcional: verifique se as funções foram importadas corretamente
console.log('Funções do artistController:', artistController);

router.get('/', artistController.getArtists);
router.get('/profile', protect, authorize('artist'), artistController.getArtistProfile);
router.put('/profile', protect, authorize('artist'), artistController.updateArtistProfile);

module.exports = router;

