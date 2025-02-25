// src/seed.js
const mongoose = require('mongoose');
const Artist = require('./models/Artist');

const seedDatabase = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // 6.1 Limpar dados existentes (opcional)
  await Artist.deleteMany();

  // 6.2 Inserir dados de teste
  await Artist.create({
    name: "Studio Tattoo SP",
    location: {
      coordinates: [-46.633308, -23.550520], // São Paulo
      city: "São Paulo",
      state: "SP"
    }
  });

  console.log('✅ Dados de teste inseridos!');
  process.exit();
};

seedDatabase();