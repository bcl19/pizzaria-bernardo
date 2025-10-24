const express = require("express");
const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");
const router = express.Router();

// 📍 Rota de cadastro
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Preencha todos os campos ❌" });
    }

    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.json({ success: false, message: "Usuário já cadastrado ❌" });
    }

    const senhaHash = await bcrypt.hash(password, 10);
    const novoUsuario = new Usuario({ email, password: senhaHash });
    await novoUsuario.save();

    res.json({ success: true, message: "Cadastro realizado com sucesso ✅" });
  } catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
});

// 📍 Rota de login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Preencha todos os campos ❌" });
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.json({ success: false, message: "Usuário não encontrado ❌" });
    }

    const senhaValida = await bcrypt.compare(password, usuario.password);
    if (!senhaValida) {
      return res.json({ success: false, message: "Senha incorreta ❌" });
    }

    res.json({ success: true, message: "Login realizado com sucesso 🍕" });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
});

module.exports = router;
