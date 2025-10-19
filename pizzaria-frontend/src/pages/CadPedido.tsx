import React, { useState } from "react";
import { Paper, Typography, Button, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import Grid from "@mui/material/GridLegacy";



type LocationState = {
  pizza: string;
};

const CadPedido: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { adicionarPedido } = useCart();

  const state = location.state as LocationState;
  const pizzaSelecionada = state?.pizza || "Pizza não selecionada";

  const [quantidade, setQuantidade] = useState<number>(1);
  const [observacoes, setObservacoes] = useState<string>("");

  const handleAdicionarCarrinho = () => {
    adicionarPedido({ pizza: pizzaSelecionada, quantidade, observacoes });
    navigate("/finalpedido");
  };

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ p: 3 }}>
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={5} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" color="primary.main" fontWeight={600}>
            Cadastro do Pedido
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            Pizza selecionada: <strong>{pizzaSelecionada}</strong>
          </Typography>

          <TextField
            label="Quantidade"
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            fullWidth
            sx={{ mt: 2 }}
            inputProps={{ min: 1 }}
          />

          <TextField
            label="Observações"
            multiline
            rows={3}
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            fullWidth
            onClick={handleAdicionarCarrinho}
          >
            Adicionar ao Carrinho
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CadPedido;
