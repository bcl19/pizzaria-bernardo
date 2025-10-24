import React from "react";
import CartButton from "../components/CartButton";
import HomeButton from "../components/HomeButton";
import CadPage from "../components/CadPage";

const CadPedido: React.FC = () => {
  return (
    <>
      <CartButton />
      <HomeButton/>
      <CadPage/> 
    </>
  );
};

export default CadPedido;
