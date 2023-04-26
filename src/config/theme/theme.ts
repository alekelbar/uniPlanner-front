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
      paper: "#393E46",
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});

export default defaultTheme;
