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
  