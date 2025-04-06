const mongoose = require("mongoose");
const Appointment = require("../models/Appointments");

// ✅ Criar um novo agendamento
exports.createAppointment = async (req, res, next) => {
  try {
    const { artistId, appointmentDate, service, notes } = req.body;

    if (!mongoose.Types.ObjectId.isValid(artistId)) {
      return res.status(400).json({ success: false, message: "ID de artista inválido" });
    }

    const userId = "65fd2b1c4e9dce001c2a9a72"; // Exemplo - substituir por middleware real

    const newAppointment = new Appointment({
      user: userId,
      artistId,
      date: appointmentDate,
      service,
      notes,
      status: "confirmed"
    });

    await newAppointment.save();

    const populatedAppointment = await Appointment.findById(newAppointment._id)
      .populate("artistId", "name specialization")
      .populate("user", "name email");

    res.status(201).json({
      success: true,
      message: "Agendamento criado com sucesso!",
      data: populatedAppointment
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Listar agendamentos de um usuário
exports.getAppointmentsByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "ID inválido" });
    }

    const appointments = await Appointment.find({ user: userId })
      .populate("artistId", "name avatarUrl specialization contact")
      .sort({ date: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments.map((appt) => ({
        ...appt,
        artist: appt.artistId,
        artistId: undefined
      }))
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Listar agendamentos de um artista
exports.getAppointmentsByArtist = async (req, res, next) => {
  try {
    const { artistId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(artistId)) {
      return res.status(400).json({ success: false, message: "ID inválido" });
    }

    const appointments = await Appointment.find({ artistId })
      .populate("user", "name email phone avatarUrl")
      .sort({ date: 1 })
      .lean();

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments.map((appt) => ({
        ...appt,
        client: appt.user,
        user: undefined
      }))
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Listagem geral com filtros
exports.listAppointments = async (req, res, next) => {
  try {
    const { userId, artistId, status, fromDate, toDate } = req.query;
    const filter = {};

    if (userId) filter.user = userId;
    if (artistId) filter.artistId = artistId;
    if (status) filter.status = status;

    if (fromDate || toDate) {
      filter.date = {};
      if (fromDate) filter.date.$gte = new Date(fromDate);
      if (toDate) filter.date.$lte = new Date(toDate);
    }

    const appointments = await Appointment.find(filter)
      .populate("user", "name")
      .populate("artistId", "name")
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

// ✅ Atualizar agendamento
exports.updateAppointment = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ success: false, message: "ID inválido" });
    }

    const updatedData = {
      ...req.body,
      date: req.body.appointmentDate
    };

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      updatedData,
      { new: true, runValidators: true }
    )
      .populate("user", "name")
      .populate("artistId", "name");

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Agendamento não encontrado" });
    }

    res.status(200).json({
      success: true,
      message: "Agendamento atualizado com sucesso!",
      data: appointment
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Cancelar agendamento
exports.cancelAppointment = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ success: false, message: "ID inválido" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: "cancelled", cancelledAt: Date.now() },
      { new: true }
    )
      .populate("user", "name")
      .populate("artistId", "name");

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Agendamento não encontrado" });
    }

    res.status(200).json({
      success: true,
      message: "Agendamento cancelado com sucesso",
      data: appointment
    });
  } catch (err) {
    next(err);
  }
};

