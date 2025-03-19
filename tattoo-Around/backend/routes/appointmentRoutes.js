const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { createAppointment, cancelAppointment } = require("../controllers/appointmentController");
const Appointment = require("../models/Appointment"); // Corrigido o nome do modelo
const { body, validationResult } = require("express-validator");

// ✅ Criar um agendamento com validação
router.post(
  "/appointments",
  [
    body("artistId").notEmpty().withMessage("artistId é obrigatório"),
    body("appointmentDate").isISO8601().withMessage("appointmentDate deve ser uma data válida"),
    body("service").notEmpty().withMessage("service é obrigatório"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
  createAppointment
);

// ✅ Listar todos os agendamentos (corrigido para `/appointments`)
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find(); // Busca todos os agendamentos
    return res.status(200).json(appointments);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar agendamentos", error });
  }
});

// ✅ Cancelar um agendamento
router.put("/appointments/:appointmentId/cancel", protect, cancelAppointment);

module.exports = router;
