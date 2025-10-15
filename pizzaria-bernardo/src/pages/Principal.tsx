import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Principal: React.FC = () => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Tenta carregar o usuário autenticado do backend
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/"); // Se não tiver token, volta pro login
      return;
    }

    // Verifica o token no backend
    fetch("http://localhost:5000/api/auth/verify", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setUser({ email: data.email });
        } else {
          localStorage.removeItem("token");
          navigate("/");
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="page page-principal">
      <header className="brand">
        <h1>🍕 Pizzaria do Dev by bcl19</h1>
      </header>

      <main className="card">
        <h2>Bem-vindo {user?.email || "Carregando..."}</h2>
        <p>Escolha sua pizza e aproveite!</p>
        <button className="botao" onClick={handleLogout}>
          Logout
        </button>
      </main>

      <footer className="footer">© Bernardo Chimelli</footer>
    </div>
  );
};

export default Principal;
