import React from "react";
import {IconButton} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";

const HomeButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <IconButton
      color="primary"
      onClick={() => navigate("/")}
      sx={{
        position: "fixed",
        top: 20,
        left: 20,
        zIndex: 1000,
        backgroundColor: "#fff",
        boxShadow: 2,
        "&:hover": {
          backgroundColor: "#e0f7fa",
        },
      }}
    >
      <HomeIcon />
    </IconButton>
  );
};



export default HomeButton;
