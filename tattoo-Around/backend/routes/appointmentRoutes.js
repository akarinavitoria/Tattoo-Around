const express = require("express");
const router = express.Router();
const {
  listAppointments,
  createAppointment,
  cancelAppointment,
  updateAppointment,
  getAppointmentsByUser,
  getAppointmentsByArtist,
} = require("../controllers/appointmentController");
const Appointment = require("../models/Appointments");
const { body, validationResult } = require("express-validator");

// ✅ Criar um agendamento
router.post(
  "/",
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

// ✅ Listar agendamentos de um usuário específico
router.get("/user/:userId", getAppointmentsByUser);

// ✅ Listar agendamentos de um artista específico
router.get("/artist/:artistId", getAppointmentsByArtist);

// ✅ Listar todos os agendamentos com filtros opcionais
router.get("/", listAppointments);

// ✅ Buscar um agendamento pelo ID
router.get("/:appointmentId", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Agendamento não encontrado" });
    }
    return res.status(200).json(appointment);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar o agendamento", error });
  }
});

// ✅ Atualizar um agendamento pelo ID
router.put("/:appointmentId", updateAppointment);

// ✅ Cancelar um agendamento
router.put("/:appointmentId/cancel", cancelAppointment);

module.exports = router;
