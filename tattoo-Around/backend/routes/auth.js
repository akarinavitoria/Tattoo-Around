const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db"); // Conexão com o banco de dados

const router = express.Router();

// Rota de Cadastro
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
  }

  try {
    // Verificar se o e-mail já está cadastrado
    const existingUser = await db("users").where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ message: "E-mail já cadastrado!" });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir usuário no banco
    const [userId] = await db("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    // Gerar Token JWT
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ message: "Usuário cadastrado com sucesso!", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

module.exports = router;
