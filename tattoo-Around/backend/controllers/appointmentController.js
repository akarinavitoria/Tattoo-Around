const Appointment = require("../models/Appointments");

// ✅ Criar um agendamento (simulação de resposta)
exports.createAppointment = async (req, res, next) => {
  try {
    const appointment = req.body; // Apenas retorna os dados para testes
    return res.status(201).json({
      success: true,
      data: appointment
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Cancelar um agendamento
exports.cancelAppointment = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;

    // Verifica se o agendamento existe
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Agendamento não encontrado."
      });
    }

    // Atualiza o status para "Cancelado"
    appointment.status = "Cancelado";
    await appointment.save();

    return res.status(200).json({
      success: true,
      message: "Agendamento cancelado com sucesso",
      data: appointment
    });
  } catch (err) {
    next(err);
  }
};
