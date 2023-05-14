import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { Stack } from "@mui/system";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { RESPONSES } from "../../interfaces/response-messages";
import { useAppDispatch } from "../../redux/hooks";
import { startAddCourse } from "../../redux/thunks/courses.thunks";
import { courseValidations } from "./validation/courseValidations";
import { Close } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { TextFieldError } from "../common/TextFieldError";
import { CloseDialogButton } from "../common/CloseDialogButton";

interface AddCourseDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AddCourseDialog({
  onClose,
  open,
}: AddCourseDialogProps): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    query: { careerId, userId },
  } = router;

  const theme: Partial<Theme> = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints!.up("md"));

  const formik = useFormik({
    initialValues: {
      name: "",
      courseDescription: "",
      credits: 4,
    },
    onSubmit: async (values) => {
      onClose();
      const response = await dispatch(
        startAddCourse({
          ...values,
          career: careerId as string,
          user: userId as string,
        })
      );

      if (response !== RESPONSES.SUCCESS) Swal.fire(response);

      formik.resetForm();
    },
    validationSchema: courseValidations,
  });

  return (
    <>
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            height: "auto",
            width: fullScreen ? "50%" : "80%",
          },
        }}
        onClose={onClose}
        open={open}
      >
        <DialogTitle>
          <Typography variant="caption" align="center">
            Nuevo Curso
          </Typography>
          {Object.keys(formik.errors).length > 0 && (
            <Alert variant="filled" color="error">
              <Typography variant="body1">
                Por favor complete todos los campos.
              </Typography>
            </Alert>
          )}
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
              value={formik.values.name}
              name={"name"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText="Ingrese el nombre del curso"
              placeholder="Nombre"
              autoComplete="off"
              rows={2}
              multiline
              type={"text"}
            />
            {formik.touched.name && formik.errors.name && (
              <TextFieldError msg={formik.errors.name} />
            )}
            <TextField
              fullWidth
              value={formik.values.courseDescription}
              name={"courseDescription"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText="Ingrese la descripción del curso"
              placeholder="Descripción"
              autoComplete="off"
              rows={2}
              multiline
              type={"text"}
            />
            {formik.touched.courseDescription &&
              formik.errors.courseDescription && (
                <TextFieldError msg={formik.errors.courseDescription} />
              )}
            <TextField
              fullWidth
              value={formik.values.credits}
              name={"credits"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText="Agregue el valor en creditos del curso"
              placeholder="Credito"
              autoComplete="off"
              rows={2}
              multiline
              type={"text"}
            />
            {formik.touched.credits && formik.errors.credits && (
              <TextFieldError msg={formik.errors.credits} />
            )}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="secondary"
            >
              Agregar
            </Button>
          </Stack>
        </DialogContent>
        <Stack spacing={1} display={"flex"} direction={"column"}>
          <CloseDialogButton onClose={onClose} />
        </Stack>
      </Dialog>
    </>
  );
}
