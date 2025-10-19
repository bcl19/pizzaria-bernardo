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
      nome TEXT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);

  // Cria também a tabela pedidos
  await db.run(`
    CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pizza TEXT,
      quantidade INTEGER,
      observacoes TEXT
    )
  `);

  console.log("📦 Banco de dados inicializado!");
})();

// 🔹 Rota de cadastro de usuário
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { nome, email, password } = req.body;
    if (!nome || !email || !password)
      return res.status(400).json({ error: "Nome, email e senha são obrigatórios" });

    const userExists = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (userExists)
      return res.status(400).json({ error: "Usuário já existe" });

    const hash = await bcrypt.hash(password, 10);
    await db.run(
      "INSERT INTO users (nome, email, password) VALUES (?, ?, ?)",
      [nome, email, hash]
    );

    const token = jwt.sign({ email }, SECRET, { expiresIn: "2h" });
    res.json({ token });
  } catch (err) {
    console.error("Erro no signup:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// 📦 Rota para salvar pedidos
app.post("/api/pedidos", async (req, res) => {
  try {
    const { pedidos } = req.body;

    if (!pedidos || !Array.isArray(pedidos)) {
      return res.status(400).json({ error: "Lista de pedidos inválida" });
    }

    for (const p of pedidos) {
      console.log("🍕 Pedido recebido:", p);
      await db.run(
        "INSERT INTO pedidos (pizza, quantidade, observacoes) VALUES (?, ?, ?)",
        [p.pizza, p.quantidade, p.observacoes || ""]
      );
    }

    res.json({ message: "Pedidos recebidos com sucesso!" });
  } catch (err) {
    console.error("Erro ao processar pedidos:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// 📦 Listar pedidos
app.get("/api/pedidos", async (req, res) => {
  try {
    const pedidos = await db.all("SELECT * FROM pedidos");
    res.json(pedidos);
  } catch (err) {
    console.error("Erro ao buscar pedidos:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// 📦 Verificar token
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

// 🔹 Rota raiz
app.get("/", (req, res) => {
  res.send("Servidor rodando ✅");
});

// 🔹 Inicia o servidor
app.listen(5000, () => console.log("✅ Servidor rodando em http://localhost:5000"));
