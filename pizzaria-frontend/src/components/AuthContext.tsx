import React, { createContext, useState } from "react";
import type { ReactNode } from "react";

export interface User {
  nome: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (nome: string, email: string, password: string) => boolean;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Cria o contexto
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

// Componente Provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [usersDB, setUsersDB] = useState<
    Array<{ nome: string; email: string; password: string }>
  >([]);

  const signup = (nome: string, email: string, password: string): boolean => {
    const exists = usersDB.find((u) => u.email === email);
    if (exists) return false; // usuário já existe
    setUsersDB([...usersDB, { nome, email, password }]);
    setUser({ nome, email });
    return true;
  };

  const login = (email: string, password: string): boolean => {
    const found = usersDB.find((u) => u.email === email && u.password === password);
    if (found) {
      setUser({ nome: found.nome, email: found.email });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
