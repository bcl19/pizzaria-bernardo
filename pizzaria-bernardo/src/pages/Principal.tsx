import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Principal: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // volta para login
  };

  return (
    <div className="page page-principal">
      <header className="brand">
        <h1>🍕 Pizzaria do Dev</h1>
      </header>

      <main className="card">
        <h2>Bem-vindo {user?.email}</h2>
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
