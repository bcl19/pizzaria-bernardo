import React, { useEffect } from "react";
import { Card, CardContent, CardActions, Typography, Button, CardMedia, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import Grid from "@mui/material/GridLegacy";


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

const PrincipalPage: React.FC = () => {
  const navigate = useNavigate();
  const textControls = useAnimation();

  useEffect(() => {
    textControls.start({
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 12, delay: 0.2 },
    });
  }, [textControls]);

  const handleSelecionar = (pizza: string) => {
    navigate("/cadpedido", { state: { pizza } });
  };

  return (
    <Box sx={{ backgroundColor: "#fff3f3", minHeight: "100vh", p: 4, position: "relative" }}>
      {/* Texto animado no topo */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={textControls}
        style={{ width: "100%", position: "absolute", top: 20, zIndex: 1 }}
      >
        <Typography
          variant="h3"
          component="h1"
          align="center"
          sx={{
            color: "#d32f2f",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          🍕 Escolha sua Pizza favorita! 🍕
        </Typography>
      </motion.div>

      {/* Grid de pizzas */}
      <Grid container spacing={3} justifyContent="center" sx={{ mt: 10 }}>
        {pizzas.map((pizza) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={pizza.id}>
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

export default PrincipalPage;
