const express = require('express');
const router = express.Router();
const { createReview } = require('../controllers/reviewController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const rateLimit = require('express-rate-limit');

router.post(
  '/',
  protect,
  authorize('user', 'admin'), // Permite usuários comuns e admins
  createReview
);

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requisições por IP
  message: 'Muitas requisições deste IP, tente novamente mais tarde.'
}));

module.exports = router;

