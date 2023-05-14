import { ColorLens } from "@mui/icons-material";
import {
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Loading } from "@/components/common/Loading";
import { isValidToken } from "@/helpers/isValidToken";
import { RESPONSES } from "@/interfaces/response-messages";
import { Setting } from "@/interfaces/settings-interfaces";
import { useAppDispatch, useAppSelector } from "@/redux";
import {
  startLoadSetting,
  startUpdateSetting,
} from "@/redux/thunks/settings-thunks";
import { Formik } from "formik";
import { checkQueryParams } from "@/helpers/checkQueryParams";

const SettingsPage = () => {
  const router = useRouter();
  const {
    query: { user },
  } = router;

  const dispatch = useAppDispatch();
  const { selected, loading } = useAppSelector((state) => state.setting);
  const [loadingState, setLoadingState] = useState(false);

  const onLoad = useCallback(async () => {
    const response = await dispatch(startLoadSetting(user as string));

    if (response.trim() === RESPONSES.INVALID_ID) {
      await router.push("/");
      return;
    }

    if (response !== RESPONSES.SUCCESS) {
      await Swal.fire(response);
    }
  }, [user, dispatch, router]);

  useEffect(() => {
    onLoad();
  }, [user, onLoad]);

  const handleSubmit = async (values: Setting) => {
    const { user, _id } = selected as Setting;
    const { delegate, do: todo, ignore, importance, prepare, urgency } = values;

    setLoadingState(true);
    const response = await dispatch(
      startUpdateSetting({
        do: todo,
        delegate,
        ignore,
        prepare,
        importance,
        urgency,
        user,
        _id,
      })
    );

    if (response !== RESPONSES.SUCCESS) {
      await Swal.fire(response);
    } else {
      await Swal.fire({
        title: "Actualizado...",
        icon: "success",
        showConfirmButton: true,
      });
    }
    setLoadingState(false);
  };

  useEffect(() => {
    if (loadingState) {
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
  }, [loadingState]);

  if (loading) return <Loading called="settings" />;

  return (
    <Container
      sx={{
        mt: 9,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Formik initialValues={selected} onSubmit={handleSubmit}>
        {(props) => (
          <>
            <Paper
              sx={{
                p: 2,
                boxShadow: "0px 0px 5px 5px rgba(0, 0, 0, 0.2)",
              }}
              component={"form"}
              onSubmit={props.handleSubmit}
            >
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                direction={"row"}
              >
                <Typography variant="h2" fontSize={"1em"}>
                  Configuraciones de usuario
                </Typography>
              </Stack>
              <Container>
                {/* Parte A */}
                <Stack direction={"row"} justifyContent={"center"}>
                  <Typography variant="subtitle1">
                    <ColorLens sx={{ fontSize: "4em" }} />
                  </Typography>
                </Stack>
                <Stack
                  mt={3}
                  direction={"row"}
                  alignItems={"baseline"}
                  spacing={2}
                  justifyContent={"center"}
                  width={"100%"}
                >
                  <TextField
                    type="color"
                    sx={{
                      width: "70%",
                    }}
                    name={"do"}
                    value={props.values.do}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={"Prio.1"}
                  />
                  {props.touched.do && props.errors.do && (
                    <Typography variant="caption" color={"error"}>
                      {props.errors.do}
                    </Typography>
                  )}
                  <TextField
                    type="color"
                    sx={{
                      width: "70%",
                    }}
                    name={"prepare"}
                    value={props.values.prepare}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={"Prio.2"}
                  />
                  {props.touched.prepare && props.errors.prepare && (
                    <Typography variant="caption" color={"error"}>
                      {props.errors.prepare}
                    </Typography>
                  )}
                  <TextField
                    type="color"
                    sx={{
                      width: "70%",
                    }}
                    name={"delegate"}
                    value={props.values.delegate}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={"Prio.3"}
                  />
                  {props.touched.delegate && props.errors.delegate && (
                    <Typography variant="caption" color={"error"}>
                      {props.errors.delegate}
                    </Typography>
                  )}
                  <TextField
                    type="color"
                    sx={{
                      width: "70%",
                    }}
                    name={"ignore"}
                    value={props.values.ignore}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={"Prio.4"}
                  />
                  {props.touched.ignore && props.errors.ignore && (
                    <Typography variant="caption" color={"error"}>
                      {props.errors.ignore}
                    </Typography>
                  )}
                </Stack>
                {/* Parte B */}
                <Stack direction={"row"} justifyContent={"center"} mt={1}>
                  <Button
                    sx={{ width: "50%" }}
                    data-testid="aply-changes"
                    type="submit"
                    color="secondary"
                  >
                    Aplicar cambios
                  </Button>
                </Stack>
              </Container>
            </Paper>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default SettingsPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (checkQueryParams(ctx))
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  const { token } = ctx.req.cookies;
  return !token || !(await isValidToken(JSON.parse(token).token))
    ? {
        redirect: {
          destination: "/auth",
          permanent: false,
        },
      }
    : {
        props: {},
      };
};
