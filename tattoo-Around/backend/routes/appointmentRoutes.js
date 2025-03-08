const express = require('express');
const router = express.Router();
const { createAppointment } = require('../controllers/appointmentController');
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

// Rota para cancelar um agendamento
router.put('/:appointmentId/cancel', protect, cancelAppointment);

module.exports = router;
