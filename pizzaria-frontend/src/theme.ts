// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff8c00", // laranja
    },
    secondary: {
      main: "#ffd700", // dourado
    },
    background: {
      default: "#1a1a1a",
      paper: "#2b2b2b",
    },
    text: {
      primary: "#fff",
      secondary: "#ccc",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', sans-serif",
    h4: { fontWeight: 700 },
    button: { fontWeight: 700, textTransform: "none" },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
