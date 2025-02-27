const express = require('express');
const router = express.Router();
const { createReview } = require('../controllers/reviewController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.post(
  '/',
  protect,
  authorize('user', 'admin'), // Permite usuários comuns e admins
  createReview
);

module.exports = router;

