/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, type ReactNode } from "react";
import type { Pedido, CartContextType } from "./types";

 
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
  export const useCart = (): CartContextType => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};
