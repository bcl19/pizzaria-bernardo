// src/context/CartContext.tsx
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../services/authService";

interface Pedido {
  pizza: string;
  quantidade: number;
  observacoes?: string;
  preço: number;
}

interface CartContextType {
  pedidos: Pedido[];
  adicionarPedido: (pedido: Pedido) => void;
  limparCarrinho: () => void;
  carregarPedidos: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  // 🔹 Função para carregar pedidos do banco (após login ou refresh)
  const carregarPedidos = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await axios.get("http://localhost:5000/api/pedidos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPedidos(response.data);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
    }
  };

  // 🔹 Adiciona pedido localmente e sincroniza com banco
  const adicionarPedido = async (pedido: Pedido) => {
    const novosPedidos = [...pedidos, pedido];
    setPedidos(novosPedidos);

    const token = getToken();
    if (token) {
      try {
        await axios.post(
          "http://localhost:5000/api/pedidos",
          { pedidos: [pedido] },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Erro ao salvar pedido no banco:", error);
      }
    }

    // salva localmente também
    localStorage.setItem("carrinho", JSON.stringify(novosPedidos));
  };

  // 🔹 Limpa carrinho
  const limparCarrinho = async () => {
    setPedidos([]);
    localStorage.removeItem("carrinho");

    const token = getToken();
    if (token) {
      try {
        await axios.delete("http://localhost:5000/api/pedidos", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("Erro ao limpar pedidos:", error);
      }
    }
  };

  // 🔹 Ao iniciar, tenta restaurar carrinho do localStorage
  useEffect(() => {
    const token = getToken();
    if (token) {
      carregarPedidos();
    } else {
      const carrinhoLocal = localStorage.getItem("carrinho");
      if (carrinhoLocal) setPedidos(JSON.parse(carrinhoLocal));
    }
  }, []);

  return (
    <CartContext.Provider value={{ pedidos, adicionarPedido, limparCarrinho, carregarPedidos }}>
      {children}
    </CartContext.Provider>
  );
};
