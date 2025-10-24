import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { cadastrarUsuario } from "../api";
import { AxiosError } from "axios";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !email || !password) {
      setErro("Preencha todos os campos!");
      return;
    }

    try {
      const response = await cadastrarUsuario(nome,email,password);
      if (response) {
        alert("Cadastro realizado com sucesso! Faça login.");
        navigate("/");
      }
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      setErro(
        err.response?.data?.error ||
          "Erro no servidor. Tente novamente mais tarde."
      );
    }
  };

  return (
    <>
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
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" gutterBottom color="primary">
            Criar Conta 🍕
          </Typography>

          <form onSubmit={handleSignup}>
            <TextField
              fullWidth
              label="Nome"
              margin="normal"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
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
              Cadastrar
            </Button>

            <Button
              fullWidth
              color="secondary"
              sx={{ mt: 2 }}
              onClick={() => navigate("/")}
            >
              Já tem conta? Fazer Login
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default SignupPage;
