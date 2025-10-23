import React from "react";
import {
  // Mantenha o Grid importado
  Grid, 
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CardMedia,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CartButton from "../components/CartButton";

interface Pizza {
  id: number;
  nome: string;
  imagem: string;
}

const pizzas: Pizza[] = [
  { id: 1, nome: "Calabresa", imagem: "/img/calabresa.jpg" },
  { id: 2, nome: "Mussarela", imagem: "/img/mussarela.jpg" },
  { id: 3, nome: "Portuguesa", imagem: "/img/portuguesa.jpg" },
  { id: 4, nome: "Frango com Catupiry", imagem: "/img/frango.jpg" },
];

const Principal: React.FC = () => {
  const navigate = useNavigate();

  const handleSelecionar = (pizza: string) => {
    navigate("/cadpedido", { state: { pizza } });
  };

  return (
    <Box sx={{ backgroundColor: "#fff3f3", minHeight: "100vh", p: 4 }}>
      <CartButton />

      <Typography
        variant="h4"
        color="primary"
        textAlign="center"
        fontWeight={600}
        mb={4}
      >
        Escolha sua Pizza 🍕
      </Typography>

      {/* 🛑 MUDANÇA AQUI: NOVO GRID CONTAINER */}
      <Grid container spacing={3} justifyContent="center">
        {pizzas.map((pizza) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={pizza.id}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 4,
                transition: "transform 0.2s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={pizza.imagem}
                alt={pizza.nome}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold" textAlign="center">
                  {pizza.nome}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSelecionar(pizza.nome)}
                >
                  Fazer Pedido
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Principal;