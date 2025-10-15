import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

interface Pizza {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
}

const pizzas: Pizza[] = [
  { id: 1, nome: "Margherita", preco: 25, imagem: "/pizzas/margherita.png" },
  { id: 2, nome: "Pepperoni", preco: 30, imagem: "/pizzas/pepperoni.png" },
  { id: 3, nome: "Quatro Queijos", preco: 35, imagem: "/pizzas/quatro-queijos.png" },
  { id: 4, nome: "Calabresa", preco: 28, imagem: "/pizzas/calabresa.png" },
  { id: 5, nome: "Frango com Catupiry", preco: 32, imagem: "/pizzas/frango-catupiry.png" },
];

const Principal: React.FC = () => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [pedido, setPedido] = useState<Pizza[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    fetch("http://localhost:5000/api/auth/verify", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
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

  const adicionarPizza = (pizza: Pizza) => {
    setPedido((prev) => [...prev, pizza]);
  };

  return (
    <div className="page page-principal">
      <header className="brand">
        <h1>🍕 Pizzaria do Dev by bcl19</h1>
      </header>

      <main className="card">
        <h2>Bem-vindo {user?.email || "Carregando..."}</h2>
        <p>Escolha sua pizza e aproveite!</p>

        <div className="pizza-grid">
          {pizzas.map((pizza) => (
            <div key={pizza.id} className="pizza-card">
              <img src={pizza.imagem} alt={pizza.nome} className="pizza-img" />
              <h3>{pizza.nome}</h3>
              <p>R$ {pizza.preco.toFixed(2)}</p>
              <button className="botao" onClick={() => adicionarPizza(pizza)}>
                Adicionar
              </button>
            </div>
          ))}
        </div>

        {pedido.length > 0 && (
          <div className="pedido">
            <h3>Seu pedido:</h3>
            <ul>
              {pedido.map((p, idx) => (
                <li key={idx}>
                  {p.nome} - R$ {p.preco.toFixed(2)}
                </li>
              ))}
            </ul>
            <p>
              Total: R${" "}
              {pedido.reduce((acc, p) => acc + p.preco, 0).toFixed(2)}
            </p>
          </div>
        )}

        <button className="botao logout" onClick={handleLogout}>
          Logout
        </button>
      </main>

      <footer className="footer">© Bernardo Chimelli</footer>
    </div>
  );
};

export default Principal;
