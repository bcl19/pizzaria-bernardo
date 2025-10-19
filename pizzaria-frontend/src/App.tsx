import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Principal from "./pages/Principal";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import CadPedido from "./pages/CadPedido";
import FinalPedido from "./pages/FinalPedido";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Cadastro/>} />
          <Route path="/principal" element={<Principal />} />
          <Route path="/cadpedido" element={<CadPedido />} />
          <Route path="/finalpedido" element={<FinalPedido />} />
        </Routes>
    </BrowserRouter>
    </AuthProvider>
    </CartProvider>
  );
}

export default App;
