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
            message: "visitar mi Agenda",
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
      sx={{
        color: "white",
        backgroundColor: "#9E9E9E",
        borderRadius: "20px",
        marginY: 2,
      }}
    >
      <Container>
        <Button
          sx={{
            mt: 2,
          }}
          variant="text"
          color="primary"
          fullWidth
          component={Link}
          href={userState.route}
        >
          {userState.message}
        </Button>
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="body1" fontWeight={"400"}>
            Mi aplicación es una herramienta que te permite gestionar tus
            cursos, materias y entregables de manera eficiente. Con esta app,
            puedes registrar cada uno de tus cursos y asignaturas, así como
            hacer un seguimiento detallado de tus entregables.
            <hr />
            Una de las características principales de la aplicación es que te
            proporciona información actualizada sobre el progreso de tus cursos.
            <br />
            Puedes consultar la nota promedio que llevas en cada curso,
            calculada a partir de las calificaciones obtenidas en los
            entregables. Esta función te brinda una visión clara de tu desempeño
            académico. Además, la aplicación te informa las fechas de entrega de
            los trabajos, tareas o exámenes de cada curso en diferentes unidades
            de tiempo, como días, semanas, meses u horas, según tus
            preferencias.
            <hr />
            De esta manera, nunca olvidarás una entrega importante y podrás
            organizarte mejor. Para facilitar la gestión de tus entregables, la
            app te permite asignar una clave de colores a cada uno de ellos.
            Esta función te ayuda a priorizar tus tareas según su importancia o
            urgencia. Puedes asignar colores diferentes a cada entrega y
            visualizar rápidamente cuáles son las más relevantes en tu lista.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
