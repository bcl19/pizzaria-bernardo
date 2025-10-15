import { Link, useNavigate } from "react-router-dom"
import "../App.css"
import { useState } from "react"

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [msg, setMsg] = useState("")

  const handleLogin = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok && data.token) {
      // Login bem-sucedido
      localStorage.setItem("token", data.token); // salva o JWT
      localStorage.setItem("usuarioEmail", email);
      navigate("/principal");
    } else {
      setMsg(data.error || "Email ou senha inválidos ❌");
    }
  } catch (err) {
    console.error(err);
    setMsg("Erro ao conectar com o servidor 😕");
  }
};
  return (
    <div className="page page-auth page-login">
      <div className="overlay" />
      <header className="brand">
        <h1>🍕 Pizzaria do Dev by bcl19</h1>
      </header>

      <main className="card">
        <h2>Login</h2>
        <input
          className="input"
          type="text"
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
        <button className="botao" onClick={handleLogin}>
          Entrar
        </button>
        <p className="small">{msg}</p>
        <p className="small">
          Ainda não tem conta?{" "}
          <Link to="/cadastro" className="link">
            Cadastre-se
          </Link>
        </p>
      </main>

      <footer className="footer">© Bernardo Chimelli</footer>
    </div>
  )
}

export default Login
