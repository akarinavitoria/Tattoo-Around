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

// Middleware para criptografar a senha antes de salvar
userSchema.pre('save', async function(next) {
  // Se a senha não foi modificada, segue para o próximo middleware
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar a senha informada com a senha armazenada
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
