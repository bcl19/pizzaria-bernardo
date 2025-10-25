// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const SECRET = "bcl19"; // ⚠️ use uma variável de ambiente em produção

app.use(cors());
app.use(bodyParser.json());

// 🔹 Inicialização do banco
let db;
(async () => {
  db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  // 🔸 Tabela de usuários
  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);

  // 🔸 Tabela de pedidos (agora inclui preço)
  await db.run(`
    CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      pizza TEXT,
      quantidade INTEGER,
      observacoes TEXT,
      preço REAL,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);

  console.log("📦 Banco de dados inicializado com sucesso!");
})();

// 🔹 Middleware de autenticação JWT
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: "Token ausente. Faça login novamente." });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await db.get("SELECT * FROM users WHERE email = ?", [decoded.email]);
    if (!user) return res.status(401).json({ error: "Usuário não encontrado" });

    req.user = user; // adiciona o usuário à requisição
    next();
  } catch (err) {
    console.error("Erro no middleware JWT:", err);
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};

// 🔹 Rota de cadastro (signup)
app.post("/api/auth/signup", async (req, res) => {
  try {
    const nome = req.body.nome?.trim();
    const email = req.body.email?.trim();
    const password = req.body.password?.trim();

    if (!nome || !email || !password) {
      return res.status(400).json({ error: "Nome, email e senha são obrigatórios" });
    }

    const userExists = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (userExists) return res.status(400).json({ error: "Usuário já existe" });

    const hash = await bcrypt.hash(password, 10);
    await db.run("INSERT INTO users (nome, email, password) VALUES (?, ?, ?)", [
      nome,
      email,
      hash,
    ]);

    const token = jwt.sign({ email }, SECRET, { expiresIn: "2h" });
    res.json({ token });
  } catch (err) {
    console.error("Erro no signup:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// 🔹 Rota de login
app.post("/api/auth/login", async (req, res) => {
  try {
    const email = req.body.email?.trim();
    const password = req.body.password?.trim();

    if (!email || !password)
      return res.status(400).json({ error: "Email e senha obrigatórios" });

    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (!user) return res.status(400).json({ error: "Usuário não encontrado" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ error: "Senha incorreta" });

    const token = jwt.sign({ email }, SECRET, { expiresIn: "2h" });
    res.json({ token });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// 🔹 Salvar um ou mais pedidos
app.post("/api/pedidos", authMiddleware, async (req, res) => {
  try {
    const { pedidos } = req.body;

    if (!pedidos || !Array.isArray(pedidos) || pedidos.length === 0) {
      return res.status(400).json({ error: "Lista de pedidos inválida" });
    }

    for (const p of pedidos) {
      await db.run(
        "INSERT INTO pedidos (user_id, pizza, quantidade, observacoes, preço) VALUES (?, ?, ?, ?, ?)",
        [req.user.id, p.pizza, p.quantidade, p.observacoes || "", p.preço || 0]
      );
    }

    res.json({ message: "Pedidos salvos com sucesso!" });
  } catch (err) {
    console.error("Erro ao salvar pedidos:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// 🔹 Buscar pedidos do usuário logado
app.get("/api/pedidos", authMiddleware, async (req, res) => {
  try {
    const pedidos = await db.all(
      "SELECT id, pizza, quantidade, observacoes, preço FROM pedidos WHERE user_id = ?",
      [req.user.id]
    );
    res.json(pedidos);
  } catch (err) {
    console.error("Erro ao buscar pedidos:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// 🔹 Limpar pedidos (opcional)
app.delete("/api/pedidos", authMiddleware, async (req, res) => {
  try {
    await db.run("DELETE FROM pedidos WHERE user_id = ?", [req.user.id]);
    res.json({ message: "Pedidos apagados com sucesso!" });
  } catch (err) {
    console.error("Erro ao limpar pedidos:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// 🔹 Rota raiz
app.get("/", (req, res) => {
  res.send("Servidor rodando ✅");
});

// 🔹 Inicialização do servidor
app.listen(5000, () => console.log("🚀 Servidor rodando em http://localhost:5000"));
