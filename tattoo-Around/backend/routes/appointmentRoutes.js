const express = require('express');
const router = express.Router();
const { createAppointment } = require('../controllers/appointmentController');

// Rota para criação de agendamentos
router.post('/', createAppointment);

// Rota para cancelar um agendamento
router.put('/:appointmentId/cancel', protect, cancelAppointment);

module.exports = router;
