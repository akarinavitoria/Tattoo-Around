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

// ✅ Listar agendamentos com filtros opcionais
exports.listAppointments = async (req, res, next) => {
  try {
    // Pegamos os filtros opcionais da URL
    const { userId, artistId, status } = req.query;

    // Criamos um objeto de filtro vazio
    let filter = {};

    // Se o usuário enviou um userId, filtramos pelos agendamentos desse usuário
    if (userId) {
      filter.user = userId;
    }

    // Se o usuário enviou um artistId, filtramos pelos agendamentos desse tatuador
    if (artistId) {
      filter.artistId = artistId;
    }

    // Se o usuário enviou um status, filtramos pelo status correspondente
    if (status) {
      filter.status = status;
    }

    // Buscamos os agendamentos no banco de dados com os filtros aplicados
    const appointments = await Appointment.find(filter);

    return res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Atualizar um agendamento existente
exports.updateAppointment = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;
    const { appointmentDate, service, notes } = req.body;

    // Encontramos e atualizamos o agendamento no banco de dados
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { date: appointmentDate, service, notes },
      { new: true, runValidators: true } // Retorna o documento atualizado
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Agendamento não encontrado.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Agendamento atualizado com sucesso!",
      data: appointment,
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

