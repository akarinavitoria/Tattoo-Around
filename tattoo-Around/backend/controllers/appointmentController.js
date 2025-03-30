const Appointment = require("../models/Appointments");

// ✅ Criar um novo agendamento no banco de dados
exports.createAppointment = async (req, res, next) => {
  try {
    const { artistId, appointmentDate, service, notes } = req.body;

    // Simulação de usuário autenticado; futuramente substitua pelo ID do usuário logado
    const userId = "65fd2b1c4e9dce001c2a9a72";

    const newAppointment = new Appointment({
      user: userId,
      artistId,
      date: appointmentDate, // Note: o campo é "date" no modelo
      service,
      notes
    });

    // Salvando no banco
    await newAppointment.save();

    return res.status(201).json({
      success: true,
      message: "Agendamento criado com sucesso!",
      data: newAppointment
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Cancelar um agendamento pelo ID
exports.cancelAppointment = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;

    // Procura o agendamento pelo ID
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Agendamento não encontrado ou não autorizado."
      });
    }

    // Atualiza o status para "cancelled" (usando valor válido para o enum)
    appointment.status = "cancelled";
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

