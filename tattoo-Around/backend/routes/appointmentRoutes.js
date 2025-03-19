const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware'); // ✅ Corrigido
const { createAppointment } = require('../controllers/appointmentController');
const Appointment = require("../models/Appointments");
const { cancelAppointment } = require('../controllers/appointmentController');
const { body, validationResult } = require('express-validator');

// Rota para criação de agendamentos
router.post('/', createAppointment);

router.post(
    '/',
    [
      body('artistId').notEmpty().withMessage('artistId é obrigatório'),
      body('appointmentDate').isISO8601().withMessage('appointmentDate deve ser uma data válida'),
      body('service').notEmpty().withMessage('service é obrigatório')
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
router.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find(); // Busca todos os agendamentos
    return res.status(200).json(appointments);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar agendamentos", error });
  }
});

// Rota para cancelar um agendamento
router.put('/:appointmentId/cancel', protect, cancelAppointment);

module.exports = router;
