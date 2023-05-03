import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Stack,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useAppDispatch } from "../../../src/redux";
import { useContext } from "react";
import {
  CreateSession,
  SESSION_TYPES,
} from "../../../src/interfaces/session-interface";
import * as Yup from "yup";
import { useFormik } from "formik";
import { startcreateSession } from "../../redux/thunks/session-thunks";
import { useRouter } from "next/router";
import { RESPONSES } from "../../interfaces/response-messages";
import Swal from "sweetalert2";
import { sessionPageContext } from "./context/SessionContext";
import { sessionValidations } from "./validation/sessionValidations";
import { Close } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { TextFieldError } from "../common/TextFieldError";

const initialValues: CreateSession = {
  duration: 1,
  name: "",
  type: SESSION_TYPES.WORKING,
};

export const SessionAddDialog = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    dialogHandler: { openCreate: open, onCloseCreate: onClose },
  } = useContext(sessionPageContext);

  const theme: Partial<Theme> = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints!.up("md"));
  const width = fullScreen ? "50%" : "80%";

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const { query } = router;
      const response = await dispatch(
        startcreateSession(query.user as string, {
          ...values,
        })
      );

      if (response !== RESPONSES.SUCCESS) await Swal.fire(response);

      formik.resetForm();
      onClose();
    },
    validationSchema: sessionValidations,
  });

  return (
    <>
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            width: width,
            height: "auto",
          },
        }}
        onClose={onClose}
        open={open}
      >
        <DialogTitle>
          <Stack spacing={1} display={"flex"} direction={"column"}>
            <Button variant="outlined" onClick={onClose}>
              <Close />
            </Button>
            <Typography variant="subtitle1" align="center">
              Nueva Sesión
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack
            component={"form"}
            onSubmit={formik.handleSubmit}
            direction="column"
            justifyContent={"center"}
            alignItems={"center"}
            spacing={2}
          >
            <TextField
              fullWidth
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              type={"text"}
              onBlur={formik.handleBlur}
              autoComplete="off"
              rows={2}
              multiline
              placeholder="Nombre"
              helperText="¿Como va a nombrar a esta sesión?"
            />

            {formik.touched.name && formik.errors.name && (
              <TextFieldError msg={formik.errors.name} />
            )}

            <TextField
              fullWidth
              name="duration"
              onChange={formik.handleChange}
              value={formik.values.duration}
              type={"number"}
              onBlur={formik.handleBlur}
              autoComplete="off"
              placeholder="Descripción"
              helperText="¿Cuál es la duración en minutos?"
            />

            {formik.touched.duration && formik.errors.duration && (
              <TextFieldError msg={formik.errors.duration} />
            )}

            <Select
              fullWidth
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name={"type"}
            >
              <MenuItem value={SESSION_TYPES.RESTING}>
                {SESSION_TYPES.RESTING}
              </MenuItem>
              <MenuItem value={SESSION_TYPES.WORKING}>
                {SESSION_TYPES.WORKING}
              </MenuItem>
            </Select>
            {formik.touched.type && formik.errors.type && (
              <TextFieldError msg={formik.errors.type} />
            )}

            <Button fullWidth type="submit" color="success" variant="contained">
              Crear
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};
