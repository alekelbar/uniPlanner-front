import Link from "@/components/common/Link";
import { isValidToken } from "@/helpers/isValidToken";
import { useAppSelector } from "@/redux";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { GetServerSideProps } from "next";

const HomePage = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Box sx={{ background: "primary.main", minHeight: "100vh" }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Bienvenido a UniPlanner
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            UniPlanner es una aplicación web enfocada en la productividad para los estudiantes de la Universidad Nacional de Costa Rica.
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Button variant="contained" color="primary" component={Link} href={`/schedule/careers/${user?.id}`} sx={{ width: "100%" }}>
                Ir al Home
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" color="primary" component={Link} href="/about" sx={{ width: "100%" }}>
                Saber más
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
