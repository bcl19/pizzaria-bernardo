import { useState } from "react"

const Login = () => {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    })

    const data = await response.json()

    if (data.success) {
      alert(data.message)
    } else {
      alert(data.message)
    }
  } catch (error) {
    console.error("Erro ao conectar com o servidor:", error)
  }
}

  return (
    <div className="overlay">
      <div className="login-box">
        <h1 className="title">🍕 Seja Bem-vindo à Pizzaria do Dev</h1>

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Digite seu Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Digite sua Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  )
}

export default Login
