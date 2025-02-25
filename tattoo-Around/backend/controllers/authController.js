const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role, estado, cidade } = req.body;
    
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user',
      estado: estado?.toUpperCase(),
      cidade
    });

    sendTokenResponse(user, 201, res);
  } catch (err) {
    next(err);
  }
};
exports.register = async (req, res, next) => { /* ... */ };

exports.login = async (req, res, next) => { /* ... */ };


const sendTokenResponse = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });

  res.status(statusCode).json({
    success: true,
    token,
    data: user
  });
};