import Link from "@/components/common/Link";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { validateToken } from "@/services/auth/validate-token";
import { useEffect, useState } from "react";
import { getUserFromToken } from "@/components/Layout/helpers/getUserFromLocalToken";
import { Loading } from "@/components/common/Loading";

const HomePage = () => {
  const [userState, setUserState] = useState({
    route: "/auth",
    message: "Iniciar sesión",
  });

  const [loading, setLoading] = useState(false);

  const getUserFromLocalState = async () => {
    const token = getUserFromToken();
    setUserState(
      token.user.id && (await validateToken(token.token))
        ? {
            message: "Ir a la pagina de inicio",
            route: `/schedule/careers/${token.user.id}`,
          }
        : {
            message: "Iniciar sesión",
            route: "/auth",
          }
    );
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getUserFromLocalState();
  }, []);

  if (loading) return <Loading called="homePage" />;

  return (
    <Box
      component={"main"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Container>
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h5" fontWeight={"400"}>
            UniPlanner es una aplicación web enfocada en la productividad para
            los estudiantes de la Universidad Nacional de Costa Rica.
          </Typography>
          <Grid container spacing={2} justifyContent="center" mt={5}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                href={userState.route}
                sx={{ width: "100%" }}
              >
                {userState.message}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
