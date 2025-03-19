const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointments");
const { createAppointment, cancelAppointment } = require("../controllers/appointmentController");
const { body, validationResult } = require("express-validator");

// Criar um agendamento
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

// Listar todos os agendamentos
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    return res.status(200).json(appointments);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar agendamentos", error });
  }
});

// Buscar um agendamento pelo ID
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

// Cancelar um agendamento
router.put("/:appointmentId/cancel", cancelAppointment);

module.exports = router;
