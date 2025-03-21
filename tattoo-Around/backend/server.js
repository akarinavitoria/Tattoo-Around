const express = require('express');
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const Sentry = require('@sentry/node');  // Importa o Sentry

dotenv.config();

// Inicializa o Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN || 'https://ee214314b9934293c1ed7f0c27a994c8@o4508971980423168.ingest.de.sentry.io/4508972003622992',
});

const app = express();

// Use o request handler do Sentry
//app.use(Sentry.Handlers.requestHandler());

// 1. Configurar variáveis antes de tudo
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

// 2. Conectar ao MongoDB ANTES de iniciar o servidor
connectDB().then(() => {

  // 3. Middlewares
  app.use(express.json());
  app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
  }));
  app.use(helmet());
  app.use(xss());
  app.use(hpp());
  app.use(mongoSanitize());

  // 4. Healthcheck com verificação real do MongoDB
  app.get('/api/healthcheck', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.status(200).json({
      status: 'success',
      message: 'API operacional',
      dbStatus: dbStatus,
      timestamp: new Date()
    });
  });

  // 5. Rotas
  app.get('/', (req, res) => {
    res.send('Bem-vindo(a) ao Tattoo Around API!');
  });  

  const authRoutes = require('./routes/authRoutes');
  const artistRoutes = require('./routes/artistRoutes');
  const reviewRoutes = require('./routes/reviewRoutes');
  const appointmentRoutes = require('./routes/appointmentRoutes');
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/artists', artistRoutes);
  app.use('/api/v1/reviews', reviewRoutes);
  app.use('/api/appointments', appointmentRoutes);

  // 6. Error handler
  const errorHandler = require('./middlewares/errorMiddleware');
  app.use(errorHandler);

  // 7. Iniciar servidor APÓS conexão com o MongoDB
  app.listen(PORT, HOST, () => {
    console.log(`\n✅ Servidor rodando em http://${HOST}:${PORT}`);
    console.log(`🗄️  MongoDB Status: ${mongoose.connection.readyState === 1 ? 'Conectado' : 'Desconectado'}`);
  });

}).catch(err => {
  console.error('Falha na inicialização:', err);
  process.exit(1);
});

// 8. Event listeners para o MongoDB
mongoose.connection.on('connected', () => {
  console.log('\n⚡ MongoDB conectado');
});

mongoose.connection.on('error', (err) => {
  console.error('\n❌ Erro no MongoDB:', err);
});
