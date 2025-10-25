// src/services/authService.ts
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  const { token } = response.data;
  localStorage.setItem("token", token);
  return token;
};

export const signup = async (nome: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/signup`, { nome, email, password });
  const { token } = response.data;
  localStorage.setItem("token", token);
  return token;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};
