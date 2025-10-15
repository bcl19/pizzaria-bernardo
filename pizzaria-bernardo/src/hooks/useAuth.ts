import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import type { AuthContextType } from "../components/AuthContext";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
};
