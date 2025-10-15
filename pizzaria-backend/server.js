const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express()
const PORT = 3000

app.use(cors())
app.use(bodyParser.json())

mongoose.connect("mongodb://127.0.0.1:27017/pizzaria", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Conectado ao MongoDB"))
.catch(err => console.error("❌ Erro ao conectar:", err))

const UsuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true }
})

const Usuario = mongoose.model("Usuario", UsuarioSchema)

app.post("/register", async (req, res) => {
  const { email, senha } = req.body

  try {
    const existe = await Usuario.findOne({ email })
    if (existe) {
      return res.json({ success: false, message: "Usuário já cadastrado ❌" })
    }

    const novoUsuario = new Usuario({ email, senha })
    await novoUsuario.save()

    res.json({ success: true, message: "Cadastro realizado com sucesso ✅" })
  } catch (err) {
    res.status(500).json({ success: false, message: "Erro no servidor" })
  }
})

app.post("/login", async (req, res) => {
  const { email, senha } = req.body

  try {
    const usuario = await Usuario.findOne({ email, senha })
    if (usuario) {
      res.json({ success: true, message: "Login realizado com sucesso 🍕" })
    } else {
      res.json({ success: false, message: "Email ou senha inválidos ❌" })
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Erro no servidor" })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
})
