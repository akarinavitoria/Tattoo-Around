const express = require('express');
const router = express.Router();
const { getReviews, createReview, updateReview, deleteReview } = require('../controllers/reviewController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Rota para obter todas as avaliações
router.get('/', getReviews);

// Rota para criar uma nova avaliação (rota protegida)
router.post('/', protect, createReview);

// Rota para atualizar uma avaliação existente (apenas para usuários com permissão, ex: 'artist' ou 'admin')
router.put('/:id', protect, authorize('artist', 'admin'), updateReview);

// Rota para deletar uma avaliação (apenas para usuários com permissão, ex: 'artist' ou 'admin')
router.delete('/:id', protect, authorize('artist', 'admin'), deleteReview);

module.exports = router;
