import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Box, IconButton, Paper } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../hooks/useCart";

const CartButton: React.FC = () => {
  const navigate = useNavigate();
  const { pedidos } = useCart();

  const handleClick = () => {
    navigate("/finalpedido");
  };

  return (
    <Paper
      elevation={4}
      sx={{
        position: "fixed",
        top: 20,
        right: 20,
        borderRadius: 2,
        p: 1,
        bgcolor: "white",
        zIndex: 1000,
      }}
    >
      <Box display="flex" alignItems="center">
        <IconButton color="primary" onClick={handleClick}>
          <Badge
            badgeContent={pedidos.length}
            color="error"
            overlap="circular"
          >
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Box>
    </Paper>
  );
};

export default CartButton;
