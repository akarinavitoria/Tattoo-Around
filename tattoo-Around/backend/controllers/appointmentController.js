const Appointment = require("../models/Appointments");

// ✅ Criar um novo agendamento no banco de dados
exports.createAppointment = async (req, res, next) => {
  try {
    const { artistId, appointmentDate, service, notes } = req.body;

    const userId = "65fd2b1c4e9dce001c2a9a72";

    const newAppointment = new Appointment({
      user: userId,  // Adicionando o usuário
      artistId,
      date: appointmentDate,  // Corrigindo o nome do campo para `date`
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

    // Busca o agendamento no banco
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

