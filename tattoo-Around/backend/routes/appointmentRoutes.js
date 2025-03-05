const express = require('express');
const router = express.Router();
const { createAppointment } = require('../controllers/appointmentController');

// Rota para criação de agendamentos
router.post('/', createAppointment);

module.exports = router;
