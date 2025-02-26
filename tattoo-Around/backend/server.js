require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');

// Configuração básica do Express
const app = express();

// 1. Conectar ao banco de dados PRIMEIRO
connectDB();

// 2. Configurar middlewares ESSENCIAIS
app.use(express.json()); // Para parsear JSON

// 3. Middlewares de segurança COM CONFIGURAÇÕES
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(mongoSanitize());

// 4. Rota de healthcheck (teste básico)
app.get('/api/healthcheck', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API operacional',
    timestamp: new Date(),
    version: '1.0.0',
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// 5. Rotas principais
const authRoutes = require('./routes/authRoutes');
const artistRoutes = require('./routes/artistRoutes');
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/artists', artistRoutes);

// 6. Middleware de erros (SEMPRE ÚLTIMO)
const errorHandler = require('./middlewares/errorMiddleware');
app.use(errorHandler);

// 7. Configuração final do servidor
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`✅ Servidor rodando em http://${HOST}:${PORT}`);
  console.log(`🔧 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗄️  DB Status: ${mongoose.connection.readyState === 1 ? 'Conectado' : 'Desconectado'}`);
});
