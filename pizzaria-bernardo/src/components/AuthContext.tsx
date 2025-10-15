import React, { createContext, useState } from "react";
import type { ReactNode } from "react";

export interface User {
  email: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => boolean;
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
  const [usersDB, setUsersDB] = useState<Array<{ email: string; password: string }>>([]);

  const signup = (email: string, password: string): boolean => {
    const exists = usersDB.find(u => u.email === email);
    if (exists) return false; // usuário já existe
    setUsersDB([...usersDB, { email, password }]);
    setUser({ email });
    return true;
  };

  const login = (email: string, password: string): boolean => {
    const found = usersDB.find(u => u.email === email && u.password === password);
    if (found) {
      setUser({ email });
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
