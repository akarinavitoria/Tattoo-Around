const mongoose = require("mongoose");
const Appointment = require("../models/Appointments");

// ✅ Criar um novo agendamento
exports.createAppointment = async (req, res, next) => {
  try {
    const { artistId, appointmentDate, service, notes } = req.body;
    
    // Validação básica de dados
    if (!mongoose.Types.ObjectId.isValid(artistId)) {
      return res.status(400).json({
        success: false,
        message: "ID de artista inválido"
      });
    }

    // Simulação de usuário autenticado (substituir por middleware real posteriormente)
    const userId = "65fd2b1c4e9dce001c2a9a72";

    const newAppointment = new Appointment({
      user: userId,
      artistId,
      date: appointmentDate,
      service,
      notes,
      status: "confirmed" // Valor padrão inicial
    });

    await newAppointment.save();

    // Popula dados básicos para a resposta
    const populatedAppointment = await Appointment.findById(newAppointment._id)
      .populate('artistId', 'name specialization')
      .populate('user', 'name email');

    res.status(201).json({
      success: true,
      message: "Agendamento criado!",
      data: populatedAppointment
    });

  } catch (err) {
    next(err);
  }
};

// ✅ Listar agendamentos por usuário (ATUALIZADO)
exports.getAppointmentsByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Formato de ID inválido"
      });
    }

    const appointments = await Appointment.find({ user: userId })
      .populate('artistId', 'name avatarUrl specialization contact')
      .sort({ date: -1 }) // Mais recentes primeiro
      .lean();

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments.map(appt => ({
        ...appt,
        artist: appt.artistId,  // Campo renomeado
        artistId: undefined     // Remove referência original
      }))
    });

  } catch (err) {
    next(err);
  }
};

// ✅ Listar agendamentos por artista (ATUALIZADO)
exports.getAppointmentsByArtist = async (req, res, next) => {
  try {
    const { artistId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(artistId)) {
      return res.status(400).json({
        success: false,
        message: "Formato de ID inválido"
      });
    }

    const appointments = await Appointment.find({ artistId })
      .populate('user', 'name email phone avatarUrl')
      .sort({ date: 1 }) // Mais próximos primeiro
      .lean();

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments.map(appt => ({
        ...appt,
        client: appt.user,  // Nomeclatura mais clara
        user: undefined
      }))
    });

  } catch (err) {
    next(err);
  }
};

// ✅ Listagem geral com filtros (ATUALIZADA)
exports.listAppointments = async (req, res, next) => {
  try {
    const { userId, artistId, status, fromDate, toDate } = req.query;
    const filter = {};

    if (userId) filter.user = userId;
    if (artistId) filter.artistId = artistId;
    if (status) filter.status = status;

    // Filtro por período
    if (fromDate || toDate) {
      filter.date = {};
      if (fromDate) filter.date.$gte = new Date(fromDate);
      if (toDate) filter.date.$lte = new Date(toDate);
    }

    const appointments = await Appointment.find(filter)
      .populate('user', 'name')
      .populate('artistId', 'name')
      .sort({ date: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });

  } catch (err) {
    next(err);
  }
};

// ✅ Atualizar agendamento (ATUALIZADO)
exports.updateAppointment = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({
        success: false,
        message: "ID inválido"
      });
    }

    const updatedData = {
      ...req.body,
      date: req.body.appointmentDate // Mantém compatibilidade
    };

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      updatedData,
      { new: true, runValidators: true }
    )
      .populate('user', 'name')
      .populate('artistId', 'name');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Agendamento não encontrado"
      });
    }

    res.status(200).json({
      success: true,
      message: "Agendamento atualizado!",
      data: appointment
    });

  } catch (err) {
    next(err);
  }
};

// ✅ Cancelar agendamento (ATUALIZADO)
exports.cancelAppointment = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({
        success: false,
        message: "ID inválido"
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: "cancelled", cancelledAt: Date.now() },
      { new: true }
    )
      .populate('user', 'name')
      .populate('artistId', 'name');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Agendamento não encontrado"
      });
    }

    res.status(200).json({
      success: true,
      message: "Agendamento cancelado",
      data: appointment
    });

  } catch (err) {
    next(err);
  }
};
