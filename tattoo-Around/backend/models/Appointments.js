const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "O usuário é obrigatório"]
  },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: [true, "O ID do tatuador é obrigatório"]
  },
  date: {
    type: Date,
    required: [true, "A data do agendamento é obrigatória"]
  },
  service: {
    type: String,
    required: [true, "O serviço é obrigatório"]
  },
  notes: {
    type: String
  },
  status: {
    type: String,
    enum: ["scheduled", "cancelled", "completed"],
    default: "scheduled"
  }
});

module.exports = mongoose.model("Appointment", AppointmentSchema);

