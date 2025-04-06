// middleware/validateObjectId.js
const mongoose = require('mongoose');

const validateObjectId = (paramName) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[paramName])) {
    return res.status(400).json({ success: false, message: 'ID inválido' });
  }
  next();
}

// Nas rotas:
router.get("/user/:userId", validateObjectId('userId'), getAppointmentsByUser);
router.get("/artist/:artistId", validateObjectId('artistId'), getAppointmentsByArtist);