// src/themes/defaultTheme.tsx
import { Inter } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

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
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      paper: "#F0F0F0",
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        sx: {
          padding: ".5em 1em",
          fontFamily: inter.style.fontFamily,
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
