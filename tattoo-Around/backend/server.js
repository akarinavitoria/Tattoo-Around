require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');

const app = express();

// Conectar ao banco de dados
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(mongoSanitize());

// Rota de healthcheck (adicione aqui)
app.get('/api/healthcheck', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API operacional',
    timestamp: new Date(),
    version: '1.0.0'
  });
});

// Importar e usar rotas
const authRoutes = require('./routes/authRoutes');
const artistRoutes = require('./routes/artistRoutes');
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/artists', artistRoutes);

// Middleware de erros (DEVE ser o último)
const errorHandler = require('./middlewares/errorMiddleware');
app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => { 
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
