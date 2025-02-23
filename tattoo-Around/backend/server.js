require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');

const app = express();

const authRoutes = require('./routes/authRoutes');
const artistRoutes = require('./routes/artistRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Middlewares de segurança
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(xss());
app.use(hpp());
app.use(mongoSanitize());

// Conexão com o banco de dados
connectDB();

// Rotas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/artists', require('./routes/artistRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

// Middleware de erros
app.use(require('./middlewares/errorMiddleware'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));