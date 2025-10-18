import React from "react";
import { Paper, Typography, Button, Grid, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const FinalPedido: React.FC = () => {
  const { pedidos, limparCarrinho } = useCart();
  const navigate = useNavigate();

  const handleConfirmar = () => {
    alert("Todos os pedidos foram finalizados com sucesso!");
    limparCarrinho();
    navigate("/");
  };

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ p: 3 }}>
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={5} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" color="primary.main" fontWeight={600}>
            Carrinho de Pedidos
          </Typography>

          {pedidos.length === 0 && (
            <Typography sx={{ mt: 2 }}>Nenhum pedido adicionado.</Typography>
          )}

          {pedidos.map((pedido, index) => (
            <div key={index}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">
                <strong>Pizza:</strong> {pedido.pizza}
              </Typography>
              <Typography variant="body1">
                <strong>Quantidade:</strong> {pedido.quantidade}
              </Typography>
              <Typography variant="body1">
                <strong>Observações:</strong> {pedido.observacoes || "Nenhuma"}
              </Typography>
            </div>
          ))}

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            fullWidth
            onClick={handleConfirmar}
          >
            Finalizar Todos os Pedidos
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FinalPedido;
