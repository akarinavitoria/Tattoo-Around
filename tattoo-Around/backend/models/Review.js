const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  artist: {
    type: mongoose.Schema.ObjectId,
    ref: 'Artist',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxlength: 500
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Impedir múltiplas reviews do mesmo usuário
reviewSchema.index({ artist: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);