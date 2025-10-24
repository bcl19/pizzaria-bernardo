import React from "react";
import CartButton from "../components/CartButton";
import HomeButton from "../components/HomeButton";
import PrincipalPage from "../components/PrincipalPage";

const Principal: React.FC = () => {
  return (
<>  
  <CartButton/>
  <HomeButton/>
  <PrincipalPage/>      
 </>);
};

export default Principal;