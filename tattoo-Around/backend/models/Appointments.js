const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  service: { type: String, required: true },
  notes: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Relacionamento com usuário
});

module.exports = mongoose.model("Appointments", AppointmentSchema);
