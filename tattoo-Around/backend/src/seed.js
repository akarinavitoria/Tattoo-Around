// src/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Artist = require('./models/Artist'); // Ajuste o caminho conforme sua estrutura

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado ao MongoDB');

    // Limpar dados existentes
    await Artist.deleteMany();

    // Inserir dados de teste
    await Artist.create({
      name: "Studio Tattoo SP",
      location: {
        type: "Point",
        coordinates: [-46.633308, -23.550520],
        city: "São Paulo",
        state: "SP"
      }
    });

    console.log('✅ Dados de teste inseridos com sucesso!');
    process.exit();
  } catch (err) {
    console.error('❌ Erro:', err.message);
    process.exit(1);
  }
};

seedDatabase();