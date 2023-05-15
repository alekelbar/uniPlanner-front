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
      main: "#A4D0A4",
    },
    secondary: {
      main: "#FFF8D6",
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
          padding: ".5em 1em",
          fontFamily: montserrat.style.fontFamily,
          textTransform: "none",
          color: "ButtonText",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {},
      },
      defaultProps: {
        variant: "elevation",
      },
    },
  },
});

export default defaultTheme;
