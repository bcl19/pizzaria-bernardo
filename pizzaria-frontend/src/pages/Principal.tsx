import React from "react";
import Grid from "@mui/material/GridLegacy";
import { Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const produtos = [
  { nome: "Pizza Margherita", descricao: "Tomate, mussarela e manjericão fresco." },
  { nome: "Pizza Calabresa", descricao: "Calabresa fatiada, cebola e orégano." },
  { nome: "Pizza Portuguesa", descricao: "Presunto, ovos, cebola, ervilha e mussarela." },
  { nome: "Pizza Quatro Queijos", descricao: "Mussarela, parmesão, gorgonzola e provolone." },
  { nome: "Pizza Frango com Catupiry", descricao: "Frango desfiado e catupiry cremoso." },
  { nome: "Pizza Napolitana", descricao: "Tomate, mussarela e alho." },
];

const Principal: React.FC = () => {
  const navigate = useNavigate();

  const handleSelecionarPizza = (pizza: string) => {
    navigate("/cadpedido", { state: { pizza } });
  };

  return (
    <Grid
      container
      spacing={4}
      padding={4}
      sx={{ backgroundColor: "#fff8f0", minHeight: "100vh" }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h3"
          align="center"
          color="primary.main"
          sx={{ fontWeight: 700, mb: 4 }}
        >
          🍕 Bem-vindo à Pizzaria do Dev
        </Typography>
      </Grid>

      {produtos.map((pizza, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Paper
            elevation={5}
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 3,
              background: "#fff3f3",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 10,
              },
            }}
          >
            <Typography
              variant="h6"
              color="primary.main"
              fontWeight={600}
              sx={{ mb: 1 }}
            >
              {pizza.nome}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: "#555" }}>
              {pizza.descricao}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSelecionarPizza(pizza.nome)}
              sx={{
                borderRadius: 2,
                px: 3,
                fontWeight: 600,
                "&:hover": { backgroundColor: "#d32f2f" },
              }}
            >
              Pedir
            </Button>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Principal;


