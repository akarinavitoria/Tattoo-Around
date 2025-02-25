// controllers/reviewController.js
const Review = require('../models/Review');

exports.createReview = async (req, res, next) => {
  try {
    const { artistId, rating, comment } = req.body;

    const review = await Review.create({
      artist: artistId,
      user: req.user.id,
      rating,
      comment
    });

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (err) {
    next(err);
  }
};

// Adicione outros métodos se necessário