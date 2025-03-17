// src/pages/Appointments.jsx
import React, { useState } from 'react';

function Appointments() {
  const [appointmentDate, setAppointmentDate] = useState('');
  const [service, setService] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para criar agendamento
    alert('Agendamento criado com sucesso');
  };

  return (
    <div>
      <h2>Agendamentos</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="datetime-local"
          name="appointmentDate"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
        />
        <select
          name="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="">Selecione o serviço</option>
          <option value="Tatuagem Tradicional">Tatuagem Tradicional</option>
          <option value="Realismo">Realismo</option>
        </select>
        <textarea
          name="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Observações"
        />
        <button type="submit">Criar Agendamento</button>
      </form>
    </div>
  );
}

export default Appointments;
