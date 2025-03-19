import React, { useState } from "react";

function Appointments() {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [service, setService] = useState("");
  const [notes, setNotes] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Mensagem de sucesso

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!appointmentDate || !service) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const appointmentData = {
      date: appointmentDate,
      service,
      notes,
    };

    try {
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar agendamento");
      }

      setSuccessMessage("Agendamento criado com sucesso"); // Exibe mensagem na interface
    } catch (error) {
      console.error("Erro ao enviar agendamento:", error);
    }
  };

  return (
    <div>
      <h2>Agendamentos</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="appointmentDate">Data e Hora</label>
        <input
          type="datetime-local"
          name="appointmentDate"
          data-cy="date-picker"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />

        <label htmlFor="service">Serviço</label>
        <select
          name="service"
          data-cy="service-select"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        >
          <option value="" data-cy="option-default">Selecione o serviço</option>
          <option value="Consulta inicial" data-cy="option-consulta">Consulta inicial</option>
          <option value="Tatuagem Tradicional" data-cy="option-tatuagem">Tatuagem Tradicional</option>
          <option value="Realismo" data-cy="option-realismo">Realismo</option>
        </select>

        <label htmlFor="notes">Observações</label>
        <textarea
          name="notes"
          data-cy="notes-textarea"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Observações"
        />

        <button type="submit" data-cy="submit-appointment">Criar Agendamento</button>
      </form>

      {/* Exibe a mensagem de sucesso */}
      {successMessage && <p data-cy="success-message">{successMessage}</p>}
    </div>
  );
}

export default Appointments;
