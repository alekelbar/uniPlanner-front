import { RESPONSES } from "@/interfaces/response-messages";
import { TASK_STATUS, Task } from "@/interfaces/task-interface";
import { useAppDispatch } from "@/redux";
import { startUpdateTask } from "@/redux/thunks/tasks-thunks";
import { Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { taskValidation } from "./validation/taskValidationSchema";
import {
  Alert,
  Button,
  Container,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { globalContext } from "../Layout/types/GlobalContext";
import { TextFieldError } from "../common/TextFieldError";

interface IEditTaskProps {
  task: Task;
}

export const EditTask: React.FC<IEditTaskProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { handleShowSnack } = useContext(globalContext);

  const initialValues = {
    name: task.name,
    descripcion: task.descripcion,
    status: task.status,
  };

  const onSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    const { descripcion, name, status } = values;

    const response = await dispatch(
      startUpdateTask({
        name,
        descripcion,
        status,
        _id: task._id,
        delivery: task.delivery,
      })
    );

    if (response !== RESPONSES.SUCCESS) {
      handleShowSnack(response);
    }
    setLoading(false);
    router.back();
  };

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
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={taskValidation}
    >
      {(formik) => (
        <Container sx={{ my: 3 }} maxWidth="sm">
          <Paper sx={{ p: 2, boxShadow: "0px 0px 5px 5px rgba(0, 0, 0, 0.2)" }}>
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
                rows={2}
                multiline
                onBlur={formik.handleBlur}
                autoComplete="off"
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
                rows={2}
                multiline
                onBlur={formik.handleBlur}
                autoComplete="off"
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
                <Typography variant="caption" color={"info.main"}>
                  {formik.errors.status}
                </Typography>
              )}

              <Button fullWidth type="submit">
                Actualizar
              </Button>

              {Object.keys(formik.errors).length > 0 && (
                <Alert variant="filled" color="error">
                  <Typography variant="body1">
                    Por favor complete todos los campos.
                  </Typography>
                </Alert>
              )}
            </Stack>
          </Paper>
        </Container>
      )}
    </Formik>
  );
};
