export type Pedido = {
  pizza: string;
  quantidade: number;
  observacoes: string;
};

export type CartContextType = {
  pedidos: Pedido[];
  adicionarPedido: (pedido: Pedido) => void;
  limparCarrinho: () => void;
};
