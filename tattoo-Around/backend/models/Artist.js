// src/models/Artist.js
const mongoose = require('mongoose');

// 5.1 Definir o Schema
const artistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true  // Garante que cada usuário tenha apenas um perfil de artista (opcional)
  },
  name: {
    type: String,
    required: [true, 'Por favor, insira o nome do artista']
  },
  specialties: [String],
  hourlyRate: Number,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
    city: String,
    state: String
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }]
}, {
  timestamps: true
});

// Cria índice geoespacial para location
artistSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Artist', artistSchema);