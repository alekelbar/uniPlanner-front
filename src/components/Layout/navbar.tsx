import { logOut } from "@/helpers/local-storage";
import { useAppDispatch } from "@/redux";
import { onLogOut } from "@/redux/slices/auth/authSlice";
import { Login, Menu } from "@mui/icons-material";
import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Link from "../common/Link";
import { getUserFromToken } from "./helpers/getUserFromLocalToken";
import { useEffect, useState } from "react";
import { validateToken } from "@/services/auth/validate-token";

interface NabvarProps {
  onOpen: () => void;
}

export function Navbar({ onOpen }: NabvarProps): JSX.Element {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Ir a inicio de sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, iniciar sesión",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      dispatch(onLogOut());
      logOut();
      router.push("/auth/");
    }
  };

  const [userState, setUserState] = useState("none");

  const getUserFromLocalState = async () => {
    const token = getUserFromToken();
    setUserState(token.user.id && await validateToken(token.token) ? "" : "none");
  };

  useEffect(() => {
    getUserFromLocalState();
  }, []);

  return (
    <AppBar position="static" sx={{}}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
          <Button
            variant="text"
            sx={{
              display: userState,
              cursor: "pointer",
              transition: "all 0.3s",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
            onClick={onOpen}
          >
            <Menu
              sx={{
                fontSize: "2em",
                color: "white",
              }}
            />
          </Button>
          <Link href={"/"} underline="none" color={"white"}>
            <Typography variant="h4">UniPlanner</Typography>
          </Link>
        </Stack>
        <Button
          variant="text"
          sx={{
            cursor: "pointer",
            transition: "all 0.3s",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
          onClick={handleLogOut}
        >
          <Login
            sx={{
              fontSize: "2em",
              color: "white",
            }}
          />
        </Button>
      </Toolbar>
    </AppBar>
  );
}
