require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');

// Importação correta das rotas
const authRoutes = require('./routes/authRoutes');
const artistRoutes = require('./routes/artistRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

// Inicializar aplicação Express
const app = express();

// Conexão com o banco de dados
connectDB();

// Middlewares básicos
app.use(express.json());
app.use(cors());

// Middlewares de segurança
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(mongoSanitize());

// Rotas principais
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/artists', artistRoutes);
app.use('/api/v1/reviews', reviewRoutes);

// Middleware de tratamento de erros (DEVE ser o último)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => 
  console.log(`Servidor rodando em ${process.env.NODE_ENV} na porta ${PORT}`)
);