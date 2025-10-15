// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const SECRET = "bcl19"; // troque por algo mais seguro

app.use(cors());
app.use(bodyParser.json());

// 🔹 Inicializa o banco SQLite
let db;
(async () => {
  db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  // Cria a tabela users se não existir
  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);
})();

// 📦 Rota de cadastro
app.get("/api/auth/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email e senha são obrigatórios" });

    const userExists = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (userExists) return res.status(400).json({ error: "Usuário já existe" });

    const hash = await bcrypt.hash(password, 10);
    await db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hash]);

    const token = jwt.sign({ email }, SECRET, { expiresIn: "2h" });
    res.json({ token });
  } catch (err) {
    console.error("Erro no signup:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// 📦 Rota de login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email e senha são obrigatórios" });

    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (!user) return res.status(400).json({ error: "Usuário não encontrado" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Senha incorreta" });

    const token = jwt.sign({ email }, SECRET, { expiresIn: "2h" });
    res.json({ token });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// 📦 Rota para verificar token
app.get("/api/auth/verify", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Token ausente" });

    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: "Token inválido" });
      res.json({ email: decoded.email });
    });
  } catch (err) {
    console.error("Erro ao verificar token:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// 🔹 Rota raiz para teste
app.get("/", (req, res) => {
  res.send("Servidor rodando ✅");
});

// 🔹 Inicia o servidor
app.listen(5000, () => console.log("✅ Servidor rodando em http://localhost:5000"));
