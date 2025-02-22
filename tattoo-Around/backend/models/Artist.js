const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  specialties: [{
    type: String,
    enum: ['traditional', 'realism', 'watercolor', 'tribal', 'japanese', 'geometric']
  }],
  portfolio: [{
    url: String,
    description: String,
    category: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  hourlyRate: {
    type: Number,
    min: 50
  },
  availability: {
    type: Map,
    of: [String] // Ex: { "seg": ["09:00", "10:00"], "ter": [...] }
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
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

// Index para busca geográfica
artistSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Artist', artistSchema);