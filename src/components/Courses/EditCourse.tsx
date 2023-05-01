import { Course } from "@/interfaces/course.interface";
import { RESPONSES } from "@/interfaces/response-messages";
import { useAppDispatch } from "@/redux";
import { startUpdateCourse } from "@/redux/thunks/courses.thunks";
import { Container, Button, Stack, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";

interface IEditCourseProps {
  course: Course;
}

export const EditCourse: React.FC<IEditCourseProps> = ({ course }) => {
  const dispatch = useAppDispatch();
  const { courseDescription, credits, name } = course;

  const initialValues = {
    name,
    courseDescription,
    credits,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(5, "Trata de utilizar al menos 5 caracteres")
      .required("Falta el nombre del curso"),
    courseDescription: Yup.string()
      .min(5, "Trata de utilizar al menos 5 caracteres")
      .required("Falta la descripción del curso"),
    credits: Yup.number()
      .positive("debe ser un numero positivo")
      .required("Porfavor, agrega los creditos que vale este curso"),
  });

  const onSubmit = async (values: typeof initialValues) => {
    const { courseDescription, credits, name } = values;

    const response = await dispatch(
      startUpdateCourse(
        {
          name,
          courseDescription,
          credits,
          career: course.career,
          user: course.user,
        },
        course._id as string
      )
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
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Container sx={{ mt: 3 }} maxWidth="sm">
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
              <Typography variant="caption" color={"info.main"}>
                {formik.errors.name}
              </Typography>
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
                <Typography variant="caption" color={"info.main"}>
                  {formik.errors.courseDescription}
                </Typography>
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
              <Typography variant="caption" color={"info.main"}>
                {formik.errors.credits}
              </Typography>
            )}
            <Button fullWidth type="submit" variant="contained" color="primary">
              Actualizar
            </Button>
          </Stack>
        </Container>
      )}
    </Formik>
  );
};
