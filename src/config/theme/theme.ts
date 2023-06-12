// src/themes/defaultTheme.tsx
import { ABeeZee, Montserrat_Alternates, Sofia_Sans_Condensed } from "next/font/google";
import { createTheme } from "@mui/material/styles";

export const montserrat = ABeeZee({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const defaultTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#81C784"
    },
    secondary: {
      main: "#03A9F4"
    },
  },
  typography: {
    fontFamily: montserrat.style.fontFamily,
    allVariants: {
      alignContent: 'center',
      fontFamily: montserrat.style.fontFamily,
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        sx: {
          textTransform: "Capitalize",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
        }
      },
      defaultProps: {
        variant: "elevation",
      },
    },
  },
});

export default defaultTheme;
