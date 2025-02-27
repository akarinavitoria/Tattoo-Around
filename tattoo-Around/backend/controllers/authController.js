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

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Verificar se email e senha foram informados
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, forneça email e senha'
      });
    }

    // Buscar o usuário e incluir a senha (se estiver selecionada como false no schema)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    // Validar a senha (assumindo que o método matchPassword está definido no model)
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

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
