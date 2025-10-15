import { createContext, useState, ReactNode, useContext } from 'react';

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [usersDB, setUsersDB] = useState<{ email: string; password: string }[]>([]); // simula DB

  const signup = (email: string, password: string) => {
    const exists = usersDB.find(u => u.email === email);
    if (exists) return false; // usuário já existe
    setUsersDB([...usersDB, { email, password }]);
    setUser({ email });
    return true;
  };

  const login = (email: string, password: string) => {
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
};
