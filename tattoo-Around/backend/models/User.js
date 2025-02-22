const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor insira um nome'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Por favor insira um email'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
  },
  password: {
    type: String,
    required: [true, 'Por favor insira uma senha'],
    minlength: 8,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'artist', 'admin'],
    default: 'user'
  },
  estado: {
    type: String,
    uppercase: true,
    maxlength: 2
  },
  cidade: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash da senha antes de salvar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model('User', userSchema);