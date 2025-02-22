import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import api from '../services/api';

const localizer = momentLocalizer(moment);

const SchedulingCalendar = ({ artistId }) => {
  const [availability, setAvailability] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Buscar disponibilidade do artista
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await api.get(`/artists/${artistId}/availability`);
        setAvailability(response.data.map(slot => ({
          title: 'Disponível',
          start: new Date(slot.start),
          end: new Date(slot.end),
        })));
      } catch (error) {
        console.error('Erro ao buscar disponibilidade:', error);
      }
    };
    fetchAvailability();
  }, [artistId]);

  const handleConfirm = async () => {
    try {
      await api.post('/appointments', {
        artistId,
        start: selectedSlot.start,
        end: selectedSlot.end
      });
      alert('Agendamento confirmado!');
      setSelectedSlot(null);
    } catch (error) {
      alert('Erro ao agendar: ' + error.response?.data?.message);
    }
  };

  return (
    <div className="scheduling-container">
      <Calendar
        localizer={localizer}
        events={availability}
        selectable
        onSelectSlot={(slotInfo) => setSelectedSlot({
          start: slotInfo.start,
          end: slotInfo.end,
        })}
        defaultView="week"
        min={new Date(0, 0, 0, 9, 0, 0)}
        max={new Date(0, 0, 0, 20, 0, 0)}
        step={30}
        timeslots={2}
        style={{ height: 500 }}
      />

      {selectedSlot && (
        <div className="booking-modal">
          <h3>Confirmar Agendamento</h3>
          <p>
            Data: {moment(selectedSlot.start).format('DD/MM/YYYY')}
            <br />
            Horário: {moment(selectedSlot.start).format('HH:mm')} - {moment(selectedSlot.end).format('HH:mm')}
          </p>
          <div className="modal-actions">
            <button onClick={() => setSelectedSlot(null)}>Cancelar</button>
            <button onClick={handleConfirm} className="confirm-button">
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};