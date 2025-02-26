// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (err) {
    console.error('Erro de conexão:', err.message);
    throw err; // Propaga o erro para o server.js
  }
};

module.exports = connectDB;