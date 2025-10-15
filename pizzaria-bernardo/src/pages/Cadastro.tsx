import { Link, useNavigate } from "react-router-dom"
import "../App.css"
import { useState } from "react"

const Cadastro: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [msg, setMsg] = useState("")

  const handleCadastro = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      navigate("/principal");
    } else {
      setMsg(data.error || "Erro ao cadastrar");
    }
  } catch {
    setMsg("Erro de conexão com o servidor");
  }
};

  return (
    <div className="page page-auth page-cadastro">
      <div className="overlay" />
      <header className="brand">
        <h1>🍕 Pizzaria do Dev by bcl19</h1>
      </header>

      <main className="card">
        <h2>Cadastro</h2>
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="botao" onClick={handleCadastro}>
          Cadastrar
        </button>
        <p className="small">{msg}</p>
        <p className="small">
          Já tem conta?{" "}
          <Link to="/" className="link">
            Fazer Login
          </Link>
        </p>
      </main>

      <footer className="footer">© Bernardo Chimelli</footer>
    </div>
  )
}

export default Cadastro
