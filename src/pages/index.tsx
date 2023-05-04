import Link from "@/components/common/Link";
import { UserToken } from "@/interfaces/users.interface";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import image from "./../../public/HeroImage.jpg";
import { UserState } from "@/interfaces/users.interface";

const HomePage = ({ userSession }: { userSession: Partial<UserState> }) => {
  return (
    <Box
      component={"main"}
      color={"#146C94"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Box
        component={"section"}
        sx={{
          zIndex: -10,
          position: "absolute",
          top: "9",
          width: "100%",
          height: "90%",
          backgroundImage: `url(${image.src})`,
          backgroundPosition: { xs: "bottom", md: "top" },
          backgroundSize: "cover",
          filter: "blur(8px) grayscale(20%) opacity(.6)",
          color: "black",
        }}
      />
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
                href={
                  !userSession.user
                    ? `/auth`
                    : `/schedule/careers/${userSession.user.id}`
                }
                sx={{ width: "100%" }}
              >
                {!userSession.token ? "Inicia sesión" : "Ir al Home"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.req.cookies;

  let userSession: Partial<UserState> = {
    user: {} as UserToken,
    token: "",
  };

  if (token) {
    const parseToken = JSON.parse(token);
    userSession = parseToken;
  }

  return {
    props: {
      userSession,
    },
  };
};
