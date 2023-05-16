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
    mode: "dark",
  },
  typography: {
    fontFamily: montserrat.style.fontFamily,
  },
  components: {
    MuiButton: {
      defaultProps: {
        sx: {
          textTransform: "Capitalize",
          boxShadow: "2px 2px",
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
