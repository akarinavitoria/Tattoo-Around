// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const { createReview } = require('../controllers/reviewController'); // Importação corrigida
const { protect, authorize } = require('../middlewares/authMiddleware');

router.post(
  '/',
  protect,
  authorize('user', 'admin'), // Permite usuários comuns e admins
  createReview // Certifique-se que está referenciando a função correta
);

module.exports = router;
