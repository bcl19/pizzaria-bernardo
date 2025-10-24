import React from "react";
import CartButton from "../components/CartButton";
import HomeButton from "../components/HomeButton";
import SignupPage from "../components/SignupPage";

const Signup: React.FC = () => {
  return (
    <>
      <CartButton />
      <HomeButton/>
      <SignupPage/>
    </>
  );
};

export default Signup;
