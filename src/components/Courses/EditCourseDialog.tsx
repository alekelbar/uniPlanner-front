import { Button, Dialog, DialogContent, DialogTitle, TextField, Typography, } from '@mui/material';

import { Stack } from '@mui/system';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { RESPONSES } from '../../interfaces/response-messages';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { startUpdateCourse } from '../../redux/thunks/courses.thunks';

interface EditCourseDialogProps {
  open: boolean,
  onClose: () => void,
}

export function EditCourseDialog ({ onClose, open }: EditCourseDialogProps): JSX.Element {

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { query: { careerId, userId } } = router;

  const { selected } = useAppSelector(state => state.courses);

  const [selectedCourse, setSelectedCourse] = useState(selected);

  const formik = useFormik({
    initialValues: {
      name: selected.name || "",
      courseDescription: selected.courseDescription || "",
      credits: selected.credits || 0,
    },
    onSubmit: async (values) => {
      const { courseDescription, credits, name } = values;

      const response = await dispatch(startUpdateCourse({
        name,
        courseDescription,
        credits,
        career: careerId as string,
        user: userId as string,
      }, selected._id!));

      if (response !== RESPONSES.SUCCESS) {
        Swal.fire(response);
      }
      onClose();
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .min(5, "Trata de utilizar al menos 5 caracteres")
        .required("Falta el nombre del curso"),
      courseDescription: Yup
        .string()
        .min(5, "Trata de utilizar al menos 5 caracteres")
        .required("Falta la descripción del curso"),
      credits: Yup.number()
        .positive("debe ser un numero positivo")
        .required('Porfavor, agrega los creditos que vale este curso'),
    }),
  });

  useEffect(() => {
    setSelectedCourse(selected);
  }, [selected]);


  return (
    <>
      <Dialog
        sx={{
          '& .MuiDialog-paper': {
            width: theme => theme.breakpoints.down('sm') ? "100%" : "50%",
            height: 'auto'
          }
        }}
        onClose={onClose}
        open={open}>
        <DialogTitle>
          Actualizar curso
        </DialogTitle>
        <DialogContent>
          {
            !selectedCourse
              ? <Typography>Parece que no se encuentra ningún curso seleccionado</Typography>
              : (
                <Stack
                  component={'form'}
                  onSubmit={formik.handleSubmit}
                  direction="column"
                  justifyContent={'center'}
                  alignItems={'center'}
                  spacing={2}>
                  <TextField
                    fullWidth
                    value={formik.values.name}
                    name={'name'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText="Ingrese el nombre del curso"
                    placeholder='Nombre'
                    autoComplete='off'
                    rows={2}
                    multiline
                    type={"text"} />
                  {formik.touched.name && formik.errors.name && (
                    <Typography variant='caption' color={'info.main'}>{formik.errors.name}</Typography>
                  )}
                  <TextField
                    fullWidth
                    value={formik.values.courseDescription}
                    name={'courseDescription'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText="Ingrese la descripción del curso"
                    placeholder='Descripción'
                    autoComplete='off'
                    rows={2}
                    multiline
                    type={"text"} />
                  {formik.touched.courseDescription && formik.errors.courseDescription && (
                    <Typography variant='caption' color={'info.main'}>{formik.errors.courseDescription}</Typography>
                  )}
                  <TextField
                    fullWidth
                    value={formik.values.credits}
                    name={'credits'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText="Agregue el valor en creditos del curso"
                    placeholder='Credito'
                    autoComplete='off'
                    rows={2}
                    multiline
                    type={"text"} />
                  {formik.touched.credits && formik.errors.credits && (
                    <Typography variant='caption' color={'info.main'}>{formik.errors.credits}</Typography>
                  )}
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary">
                    Actualizar
                  </Button>
                </Stack>
              )
          }
        </DialogContent>
      </Dialog>
    </>
  );
}

