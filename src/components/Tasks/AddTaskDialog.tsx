import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
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
import { CreateTask, TASK_STATUS } from "../../interfaces/task-interface";
import { useAppDispatch } from "../../redux";
import { startCreateTask } from "../../redux/thunks/tasks-thunks";
import { Close } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { TextFieldError } from "../common/TextFieldError";
import { CloseDialogButton } from "../common/CloseDialogButton";
import { taskValidation } from "./validation/taskValidationSchema";

interface AddTaskDialogProps {
  open: boolean;
  onClose: () => void;
}

const initialValues: CreateTask = {
  descripcion: "",
  name: "",
  status: TASK_STATUS.IMCOMPLETED,
};

export default function AddTaskDialog({
  onClose,
  open,
}: AddTaskDialogProps): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    query: { deliveryId },
  } = router;

  const theme: Partial<Theme> = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints!.up("md"));
  const width = fullScreen ? "50%" : "80%";

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      onClose();
      const { descripcion, name, status } = values;
      const response = await dispatch(
        startCreateTask({
          delivery: deliveryId as string,
          name,
          descripcion,
          status,
        })
      );

      if (response !== RESPONSES.SUCCESS) {
        await Swal.fire(response);
      }

      formik.resetForm(initialValues);
    },
    validationSchema: taskValidation,
  });

  return (
    <>
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            height: "auto",
            width,
          },
        }}
        onClose={onClose}
        open={open}
      >
        <DialogTitle>
          <Stack spacing={1} display={"flex"} direction={"column"}>
            <Typography variant="caption">Nueva Tarea</Typography>
            {Object.keys(formik.errors).length > 0 && (
              <Alert variant="filled" color="error">
                <Typography variant="body1">
                  Por favor complete todos los campos.
                </Typography>
              </Alert>
            )}
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
              helperText="¿Como va a nombrar a esta tarea?"
            />

            {formik.touched.name && formik.errors.name && (
              <TextFieldError msg={formik.errors.name} />
            )}

            <TextField
              fullWidth
              name="descripcion"
              onChange={formik.handleChange}
              value={formik.values.descripcion}
              type={"text"}
              onBlur={formik.handleBlur}
              autoComplete="off"
              rows={2}
              multiline
              placeholder="Descripción"
              helperText="¿Como describe esta tarea?"
            />

            {formik.touched.descripcion && formik.errors.descripcion && (
              <TextFieldError msg={formik.errors.descripcion} />
            )}

            <Select
              fullWidth
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name={"status"}
            >
              <MenuItem value={TASK_STATUS.COMPLETED}>
                {TASK_STATUS.COMPLETED}
              </MenuItem>
              <MenuItem value={TASK_STATUS.IMCOMPLETED}>
                {TASK_STATUS.IMCOMPLETED}
              </MenuItem>
            </Select>

            {formik.touched.status && formik.errors.status && (
              <TextFieldError msg={formik.errors.status} />
            )}

            <Button
              fullWidth
              type="submit"
              color="secondary"
              variant="contained"
            >
              Crear
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
