const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const mongoose = require("mongoose");

// Middlewares de segurança
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");

// Monitoramento
const Sentry = require("@sentry/node");

dotenv.config();

// Inicialização do Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN || "https://example@o0.ingest.sentry.io/0",
});

const app = express();

// Variáveis de ambiente
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

// Conectar ao MongoDB e iniciar servidor
connectDB().then(() => {
  // Middlewares globais
  app.use(express.json());
  app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
  }));
  app.use(helmet());
  app.use(xss());
  app.use(hpp());
  app.use(mongoSanitize());

  // Middleware do Sentry (ativar se desejar rastrear requisições)
  // app.use(Sentry.Handlers.requestHandler());

  // Healthcheck com status do MongoDB
  app.get("/api/healthcheck", (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
    res.status(200).json({
      status: "success",
      message: "API operacional",
      dbStatus,
      timestamp: new Date()
    });
  });

  // Rota raiz
  app.get("/", (req, res) => {
    res.send("🎨 Bem-vindo(a) ao Tattoo Around API!");
  });

  // Importação e uso das rotas
  const authRoutes = require("./routes/authRoutes");
  const artistRoutes = require("./routes/artistRoutes");
  const reviewRoutes = require("./routes/reviewRoutes");
  const appointmentRoutes = require("./routes/appointmentRoutes");

  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/artists", artistRoutes);
  app.use("/api/v1/reviews", reviewRoutes);
  app.use("/api/appointments", appointmentRoutes); // Apontando corretamente para suas rotas de agendamentos

  // Middleware de tratamento de erros
  const errorHandler = require("./middlewares/errorMiddleware");
  app.use(errorHandler);

  // Iniciar servidor
  app.listen(PORT, HOST, () => {
    console.log(`\n✅ Servidor rodando em http://${HOST}:${PORT}`);
    console.log(`🗄️  MongoDB Status: ${mongoose.connection.readyState === 1 ? "Conectado" : "Desconectado"}`);
  });

}).catch(err => {
  console.error("❌ Falha na inicialização do servidor:", err);
  process.exit(1);
});

// Eventos de conexão do MongoDB
mongoose.connection.on("connected", () => {
  console.log("\n⚡ MongoDB conectado com sucesso");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Erro na conexão com o MongoDB:", err);
});


