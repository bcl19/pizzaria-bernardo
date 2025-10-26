export interface Pizza {
  id: number;
  nome: string;
  imagem: string;
  preço: number;
}

export const pizzas: Pizza[] = [
  { id: 1, nome: "Calabresa", imagem: "/img/calabresa.jpg", preço: 38.5 },
  { id: 2, nome: "Mussarela", imagem: "/img/mussarela.jpg", preço: 34.9 },
  { id: 3, nome: "Portuguesa", imagem: "/img/portuguesa.jpg", preço: 34.9 },
  { id: 4, nome: "Frango com Catupiry", imagem: "/img/frango.jpg", preço: 36.9 },
];
