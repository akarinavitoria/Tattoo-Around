require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');

const app = express();

// Conectar ao banco
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(mongoSanitize());

// Rotas de teste (adicionar novas rotas aqui)
app.get('/api/test', (req, res) => {
  res.json({ 
    status: 'success',
    message: 'API está funcionando!',
    version: '1.0.0'
  });
});

// Outras rotas
const authRoutes = require('./routes/authRoutes');
const artistRoutes = require('./routes/artistRoutes');
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/artists', artistRoutes);

// Middleware de erros (SEMPRE o último)
const errorHandler = require('./middlewares/errorMiddleware');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
