import { Link } from "react-router-dom";
import "../App.css";

const Principal: React.FC = () => {
  return (
    <div className="page page-main">
      <div className="overlay" />
      <nav className="navbar">
        <div className="nav-brand">🍕 Dev</div>
        <div className="nav-links">
          <Link className="nav-link" to="#">Cardápio</Link>
          <Link className="nav-link" to="#">Contato</Link>
          <Link className="nav-link" to="/">Sair</Link>
        </div>
      </nav>

      <main className="card card-main">
        <h1>Bem-vindo à Pizzaria do Dev by bcl19!</h1>
        <p>Escolha uma das nossas deliciosas pizzas:</p>
        <ul className="lista-pizzas">
          <li>🍕 Calabresa</li>
          <li>🍕 Frango com Catupiry</li>
          <li>🍕 Quatro Queijos</li>
          <li>🍕 Portuguesa</li>
          <li>🍕 Marguerita</li>
        </ul>
        <Link to="/" className="botao botao-secundario">Sair</Link>
      </main>

      <footer className="footer">© Bernardo Chimelli</footer>
    </div>
  );
};

export default Principal;