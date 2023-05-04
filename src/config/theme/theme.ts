// src/themes/defaultTheme.tsx
import { Inter } from "next/font/google";
import { createTheme } from "@mui/material/styles";

export const inter = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#393E46",
    },
    secondary: {
      main: "#222831",
    },
    error: {
      main: "#d32f2f",
    },
    background: {
      paper: "#F1F6F9",
      default: "#EEEEEE",
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "secondary",
        sx: {
          padding: ".5em 1em",
          fontFamily: inter.style.fontFamily,
          color: "white",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#F0F0F0",
          fontFamily: inter.style.fontFamily,
        },
      },
      defaultProps: {
        variant: "elevation",
      },
    },
  },
});

export default defaultTheme;
