import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErro("Preencha todos os campos!");
      return;
    }

    const sucesso = login(email, password);
    if (sucesso) {
      navigate("/principal");
    } else {
      setErro("E-mail ou senha incorretos!");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#fff3f3" }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: 360,
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" gutterBottom color="primary">
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
  );
};

export default Login;
