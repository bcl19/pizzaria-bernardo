// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET = "segredo_da_pizzaria"; // substitua por algo mais seguro

// 📦 Rota de cadastro
app.post("/api/auth/signup", async (req, res) => {
  const { email, password } = req.body;

  const userExists = await db.get("SELECT * FROM users WHERE email = ?", [email]);
  if (userExists) {
    return res.status(400).json({ error: "Usuário já existe" });
  }

  const hash = await bcrypt.hash(password, 10);
  await db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hash]);

  const token = jwt.sign({ email }, SECRET, { expiresIn: "2h" });
  res.json({ token });
});

// 📦 Rota de login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
  if (!user) return res.status(400).json({ error: "Usuário não encontrado" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Senha incorreta" });

  const token = jwt.sign({ email }, SECRET, { expiresIn: "2h" });
  res.json({ token });
});

// 📦 Rota para verificar token
app.get("/api/auth/verify", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token ausente" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Token inválido" });
    res.json({ email: decoded.email });
  });
});

app.listen(5000, () => console.log("✅ Servidor rodando em http://localhost:5000"));
