const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Opcional: remova o console.log em produção
// console.log('Funções do artistController:', artistController);

// Rotas para gerenciamento dos artistas
router.get('/', artistController.getArtists);
router.get('/profile', protect, authorize('artist'), artistController.getArtistProfile);
router.put('/profile', protect, authorize('artist'), artistController.updateArtistProfile);

module.exports = router;


