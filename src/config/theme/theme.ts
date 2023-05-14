// src/themes/defaultTheme.tsx
import { Montserrat_Alternates } from "next/font/google";
import { createTheme } from "@mui/material/styles";

export const montserrat = Montserrat_Alternates({
  weight: ["100", "300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#F05454",
    },
    secondary: {
      main: "#3C486B",
    },
    background: {
      paper: "#F5F5F5",
      default: "#F5F5F5",
    },
  },
  typography: {
    fontFamily: montserrat.style.fontFamily,
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "secondary",
        sx: {
          // padding: ".5em 1em",
          // fontFamily: inter.style.fontFamily,
          color: "white",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
        },
      },
      defaultProps: {
        variant: "elevation",
      },
    },
  },
});

export default defaultTheme;
