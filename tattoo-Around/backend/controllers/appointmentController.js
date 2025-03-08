exports.createAppointment = async (req, res, next) => {
    try {
      // Para fins de teste, simplesmente retorne os dados recebidos
      const appointment = req.body;
      return res.status(201).json({
        success: true,
        data: appointment
      });
    } catch (err) {
      next(err);
    }
  };
  
  exports.cancelAppointment = async (req, res, next) => {
    try {
      const { appointmentId } = req.params;
      const appointment = await Appointment.findOneAndUpdate(
        { _id: appointmentId, user: req.user.id },
        { status: 'cancelled' },
        { new: true }
      );
  
      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: 'Agendamento não encontrado ou não autorizado.'
        });
      }
  
      res.status(200).json({
        success: true,
        data: appointment
      });
    } catch (err) {
      next(err);
    }
  };