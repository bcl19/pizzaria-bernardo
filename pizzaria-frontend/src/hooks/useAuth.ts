// hooks/useAuth.ts
import { useState } from "react";
import axios, { AxiosError } from "axios";

export interface User {
  nome: string;
  email: string;
  password: string
}

export interface AuthResponse {
  user: User;
  token?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  // === CADASTRO ===
  const signup = async (
    nome: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; user?: User; message?: string }> => {
    try {
      const response = await axios.post<AuthResponse>(
        "http://localhost:5000/api/auth/signup",
        { nome, email, password }
      );

      const newUser = response.data.user;
      setUser(newUser);

      return { success: true, user: newUser };
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      const message =
        err.response?.data?.message || "Erro ao cadastrar o usuário.";
      console.error("Erro no signup:", message);

      return { success: false, message };
    }
  };

  // === LOGIN ===
  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; user?: User; message?: string }> => {
    try {
      const response = await axios.post<AuthResponse>(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      const loggedUser = response.data.user;
      setUser(loggedUser);

      return { success: true, user: loggedUser };
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      const message =
        err.response?.data?.message || "Erro ao fazer login.";
      console.error("Erro no login:", message);

      return { success: false, message };
    }
  };

  // === LOGOUT ===
  const logout = (): void => {
    setUser(null);
  };

  return { user, signup, login, logout };
};
