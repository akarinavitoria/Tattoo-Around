const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new Error('Acesso não autorizado', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    
    next();
  } catch (err) {
    next(err);
  }
};

// middlewares/authMiddleware.js
exports.protect = async (req, res, next) => { /* ... */ };
exports.authorize = (...roles) => { /* ... */ };
