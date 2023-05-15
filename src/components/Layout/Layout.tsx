import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/router";
import React, { createContext, useCallback, useState } from "react";
import Copyright from "../common/Copyright";
import { FloatButton } from "../common/FloatButton";
import { SideBar } from "./SideBar";
import { Navbar } from "./navbar";
import { Alert, Box, Container, Snackbar } from "@mui/material";
import { globalContext } from "./types/GlobalContext";

interface LayoutProps {
  children: React.ReactNode;
}

export function LayoutComponent({ children }: LayoutProps): JSX.Element {
  const { pathname } = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const onClose = () => {
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };

  const homeComponent: JSX.Element = (
    <Box width={"100vw"}>
      <Navbar onOpen={onOpen} />
      <SideBar onClose={onClose} open={open} />
      <FloatButton
        onAction={() => {
          router.back();
        }}
        icon={<ArrowBack />}
        sxProps={{ position: "fixed", bottom: 16, left: 16, zIndex: "10" }}
      />
    </Box>
  );

  // Global snackbar settings
  const [snackOpen, setSnackOpen] = useState(false);
  const [messageSnack, setMessageSnack] = useState("");

  const handleClose = () => {
    setSnackOpen(false);
  };

  const handleShowSnack = useCallback((message: string) => {
    setMessageSnack(message);
    setSnackOpen(true);
  }, []);

  const { Provider } = globalContext;

  return (
    <Provider value={{ handleShowSnack }}>
      {!pathname.includes("auth") ? homeComponent : null}
      <Container sx={{ mt: 2 }}>{children}</Container>
      <Copyright />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          severity="info"
          sx={{ width: "100%" }}
        >
          {messageSnack}
        </Alert>
      </Snackbar>
    </Provider>
  );
}
