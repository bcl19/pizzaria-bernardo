/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, type ReactNode } from "react";

export interface Pedido {
  pizza: string;
  quantidade: number;
  observacoes: string;
}

export interface CartContextType {
  pedidos: Pedido[];
  adicionarPedido: (pedido: Pedido) => void;
  limparCarrinho: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const adicionarPedido = (pedido: Pedido) => setPedidos([...pedidos, pedido]);
  const limparCarrinho = () => setPedidos([]);

  return (
    <CartContext.Provider value={{ pedidos, adicionarPedido, limparCarrinho }}>
      {children}
    </CartContext.Provider>
  );
};
