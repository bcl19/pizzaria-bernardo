import { useContext } from "react";
import { CartContext } from "../context/CartProvider";
import type { CartContextType } from "../context/CartContext";

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro do CartProvider");
  return context;
};
