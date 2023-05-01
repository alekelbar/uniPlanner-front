import { RESPONSES } from "@/interfaces/response-messages";
import { TASK_STATUS, Task } from "@/interfaces/task-interface";
import { useAppDispatch } from "@/redux";
import { startUpdateTask } from "@/redux/thunks/tasks-thunks";
import { Formik } from "formik";
import React from "react";
import Swal from "sweetalert2";
import { taskValidation } from "./validation/taskValidationSchema";
import {
  Button,
  Container,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

interface IEditTaskProps {
  task: Task;
}

export const EditTask: React.FC<IEditTaskProps> = ({ task }) => {
  console.log(task);
  const dispatch = useAppDispatch();

  const initialValues = {
    name: task.name,
    descripcion: task.descripcion,
    status: task.status,
  };

  const onSubmit = async (values: typeof initialValues) => {
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
      await Swal.fire(response);
    } else {
      await Swal.fire({
        title: "Actualizado...",
        icon: "success",
        showConfirmButton: true,
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={taskValidation}
    >
      {(formik) => (
        <Container sx={{ mt: 2 }} maxWidth="sm">
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
              <Typography variant="caption" color={"info.main"}>
                {formik.errors.name}
              </Typography>
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
              <Typography variant="caption" color={"info.main"}>
                {formik.errors.descripcion}
              </Typography>
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

            <Button fullWidth type="submit" color="success" variant="contained">
              Actualizar
            </Button>
          </Stack>
        </Container>
      )}
    </Formik>
  );
};
