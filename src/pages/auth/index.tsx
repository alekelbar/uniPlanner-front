import {
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import * as Yup from "yup";

import { RESPONSES } from "../../interfaces/response-messages";
import { UserState } from "../../interfaces/users.interface";
import { useAppDispatch } from "../../redux/hooks";
import { startUserLogin } from "../../redux/thunks/user-thunks";
import { validateToken } from "../../services/auth/validate-token";
import Link from "@/components/common/Link";
import { useContext, useEffect, useState } from "react";
import { globalContext } from "@/components/Layout/types/GlobalContext";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { handleShowSnack } = useContext(globalContext);

  const [loading, setLoading] = useState(false); // Variable de estado para controlar la ventana de carga

  const formik = useFormik({
    initialValues: {
      id: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { id, password } = values;
      setLoading(true); // Mostrar la ventana de carga antes del inicio de sesión

      try {
        const response = await dispatch(
          startUserLogin({ identification: id, password })
        );

        if (response !== RESPONSES.SUCCESS) {
          handleShowSnack(response);
          return;
        }

        router.push("/");
      } catch (error) {
        Swal.fire("Error al iniciar sesión");
      } finally {
        setLoading(false); // Detener la ventana de carga después de completar el inicio de sesión
      }
    },
    validationSchema: Yup.object({
      id: Yup.string()
        .required("Su usuario es requerido")
        .min(8, "Su usuario debe ser de almenos 8 caracteres"),
      password: Yup.string()
        .required("Su contraseña es requerida")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/,
          "La contraseña debe ser alfanumérica y tener un mínimo de 8 caracteres"
        ),
    }),
  });

  useEffect(() => {
    if (loading) {
      Swal.fire({
        title: "validando...",
        icon: "question",
        showConfirmButton: false,
        allowOutsideClick() {
          return false;
        },
      });
    } else {
      Swal.close();
    }
  }, [loading]);

  return (
    <Container
      sx={{
        display: "flex",
        height: "90vh",
      }}
    >
      <Grid container sx={{ placeContent: "center" }}>
        <Paper sx={{ borderRadius: "8px" }}>
          <Box component={"form"} onSubmit={formik.handleSubmit} sx={{ p: 4 }}>
            <Grid item>
              <Typography variant="h5" my={2} align="center" width={"100%"}>
                Ingreso
                <Divider sx={{ mt: 1 }} />
              </Typography>
              <Grid container spacing={2} maxWidth="md">
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="off"
                    onBlur={formik.handleBlur}
                    fullWidth
                    onChange={formik.handleChange}
                    value={formik.values.id}
                    name="id"
                    variant="filled"
                    placeholder="alekelbar..."
                    helperText="Ingrese su usuario"
                  />
                  {formik.touched.id && formik.errors.id && (
                    <Typography variant="caption" color={"info.main"}>
                      {formik.errors.id}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="off"
                    onBlur={formik.handleBlur}
                    fullWidth
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    name="password"
                    variant="filled"
                    placeholder="Contraseña"
                    type={"password"}
                    helperText="Su contraseña"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <Typography variant="caption" color={"info.main"}>
                      {formik.errors.password}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                ¡Ingresar!
              </Button>

              <Box mt={1}>
                <Link
                  href="auth/register"
                  sx={{
                    textDecoration: "none",
                    listStyle: "none",
                    mt: 0.5,
                    width: "100",
                    color: "text.secondary",
                  }}
                >
                  <Typography variant="body1" align="center">
                    ¿Todavía no tienes una cuenta?
                  </Typography>
                </Link>
              </Box>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Container>
  );
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.req.cookies;

  if (token) {
    const parseToken: UserState = JSON.parse(token);
    const tokenString = parseToken.token;

    if (await validateToken(tokenString)) {
      return {
        redirect: {
          destination: `/schedule/careers/${parseToken.user.id}`,
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
};
