// models/Artist.js
const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  // ... outros campos
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: [Number], // [longitude, latitude]
    address: String,
    estado: String,
    cidade: String
  }
});

// Criar índice geográfico 2dsphere
artistSchema.index({ location: '2dsphere' }, { background: true });

module.exports = mongoose.model('Artist', artistSchema);