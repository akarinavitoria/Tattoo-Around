// src/models/Artist.js
const mongoose = require('mongoose');

// 5.1 Definir o Schema
const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O nome é obrigatório']
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: {
      type: [Number], // [Longitude, Latitude]
      required: true
    },
    city: String,
    state: String
  }
});

// 5.2 Criar índice geográfico
artistSchema.index({ location: '2dsphere' }); // 👈 Índice para buscas por localização

// Exportar o modelo
module.exports = mongoose.model('Artist', artistSchema);