require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');

// Inicializar aplicação Express
const app = express();

// Conectar ao banco de dados
connectDB();

// Middlewares básicos
app.use(express.json());
app.use(cors());

// Middlewares de segurança
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(mongoSanitize());

// Importação de rotas
const authRoutes = require('./routes/authRoutes');
const artistRoutes = require('./routes/artistRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Rotas principais
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/artists', artistRoutes);
app.use('/api/v1/reviews', reviewRoutes);

// Middleware de tratamento de erros (DEVE ser o último)
const errorHandler = require('./middlewares/errorMiddleware');
app.use(errorHandler);

// Configuração da porta e inicialização do servidor
const PORT = process.env.PORT || 5000;
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`Servidor rodando em ${process.env.NODE_ENV || 'development'} na porta ${PORT}`);
});