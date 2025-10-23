import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { motion, useAnimation } from "framer-motion";
import HomeButton from "../components/HomeButton";
import CartButton from "../components/CartButton";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { pedidos } = useCart();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  const controls = useAnimation();
  const totalPedidos = pedidos.reduce((acc, p) => acc + p.quantidade, 0);

  // 🎬 Animação do carrinho
  useEffect(() => {
    if (totalPedidos > 0) {
      controls.start({
        rotate: [0, -10, 10, -5, 5, 0],
        transition: { duration: 0.5 },
      });
    }
  }, [totalPedidos, controls]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErro("Preencha todos os campos!");
      return;
    }

    const sucesso = await login(email, password);
    if (sucesso) {
      navigate("/principal");
    } else {
      setErro("E-mail ou senha incorretos!");
    }
  };

  return (
  <>  
    <CartButton/>
    <HomeButton/>


    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundColor: "#fff3f3",
        position: "relative",
        px: 2,
      }}
    >
        <Badge badgeContent={totalPedidos} color="error">
          <motion.div animate={controls}>
            <ShoppingCartIcon fontSize="small" />
          </motion.div>
        </Badge>
      {/* Formulário de login */}
      <Paper
        elevation={5}
        sx={{
          p: { xs: 3, sm: 4 },
          width: "100%",
          maxWidth: 380,
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" color="primary" fontWeight="bold" mb={2}>
          Login 🍕
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="E-mail"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Senha"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {erro && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {erro}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Entrar
          </Button>

          <Button
            fullWidth
            color="secondary"
            sx={{ mt: 2 }}
            onClick={() => navigate("/signup")}
          >
            Criar nova conta
          </Button>
        </form>
      </Paper>
    </Box>
 </> );
};

export default Login;
