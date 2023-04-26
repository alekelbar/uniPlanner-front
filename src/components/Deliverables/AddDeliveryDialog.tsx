import { Button, Dialog, DialogContent, DialogTitle, MenuItem, Select, TextField, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { logOut } from '../../helpers/local-storage';
import { makePriority } from '../Career/helpers/priorityCalc';
import { DELIVERABLE_STATUS } from '../../interfaces/deliveries.interface';
import { RESPONSES } from '../../interfaces/response-messages';
import { useAppDispatch, useAppSelector } from '../../redux';
import { onLogOut } from '../../redux/slices/auth/authSlice';
import { startcreateDelivery } from '../../redux/thunks/deliverables-thunks';
import { Loading } from '@/components/common/Loading';

interface AddDeliveryDialogProps {
  open: boolean,
  onClose: () => void,
}

const initialValues = {
  name: '',
  description: '',
  deadline: '',
  status: DELIVERABLE_STATUS.PENDING,
  note: 0,
  percent: 0,
};

export default function AddDeliveryDialog ({ onClose, open }: AddDeliveryDialogProps): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { query: { courseId } } = router;
  
  const { selected } = useAppSelector(state => state.setting);

  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const width = fullScreen ? '100%' : '50%';

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const { deadline, description, name, note, percent, status } = values;

      const { importance, urgency } = makePriority(new Date(deadline),
        percent >= selected!.importance);

      const response = await dispatch(startcreateDelivery({
        deadline: new Date(deadline).toString(),
        description,
        name,
        note,
        percent,
        status,
        importance,
        urgency,
        course: courseId as string,
      }));
      if (response !== RESPONSES.SUCCESS) {
        let responseText = "";

        switch (response) {
          case RESPONSES.UNAUTHORIZE:
            responseText = "Parece que no tiene autorización para estar aquí 🔒";
            router.push("/");
            dispatch(onLogOut());
            logOut();
            onClose();
            return;
          case RESPONSES.BAD_REQUEST:
            responseText = 'Parece que hubo un inconveniente con el servidor 🔒';
            break;
        }
        await Swal.fire({
          title: "Una disculpa",
          text: responseText,
          icon: 'info'
        });
      }
      formik.resetForm(initialValues);
      onClose();
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .min(5, "Use almenos 5 caracteres")
        .required('El nombre del entregable es obligatorio'),
      description: Yup
        .string()
        .min(5, "Use almenos 5 caracteres")
        .required('La descripción del entregable es obligatoria'),
      deadline: Yup
        .date()
        .required('La fecha limite del entregable es obligatoria'),
      status: Yup
        .string()
        .required('El status del entregable es obligatorio'),
      note: Yup
        .number()
        .min(0, "La nota minima es cero")
        .max(100, 'La nota maxíma es 100')
        .required('la calificación del entregable es obligatoria'),
      percent: Yup
        .number()
        .min(0, "El porcentaje minimo es cero")
        .max(100, 'El porcentaje maxíma es 100')
        .required('El porcentaje del entregable es obligatorio'),
    }),
  });

  if (open && !selected) return <Loading called='addDelivery' />;

  return (
    <>
      <Dialog
        sx={{
          '& .MuiDialog-paper': {
            width: width,
            height: 'auto'
          }
        }}
        onClose={onClose}
        open={open}>
        <DialogTitle>
          Nueva Entrega
        </DialogTitle>
        <DialogContent>
          <Stack
            component={'form'}
            onSubmit={formik.handleSubmit}
            direction="column"
            justifyContent={'center'}
            alignItems={'center'}
            spacing={2}>

            <TextField
              fullWidth
              name="deadline"
              onChange={formik.handleChange}
              value={formik.values.deadline}
              type={'datetime-local'}
              onBlur={formik.handleBlur}
              autoComplete='off' />
            {formik.touched.deadline && formik.errors.deadline && (
              <Typography variant='caption' color={'info.main'}>{formik.errors.deadline}</Typography>
            )}

            <TextField
              fullWidth
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              type={'text'}
              rows={2}
              multiline
              placeholder="¿Cual es el nombre del entregable?"
              helperText="Entregable"
              onBlur={formik.handleBlur}
              autoComplete='off' />
            {formik.touched.name && formik.errors.name && (
              <Typography variant='caption' color={'info.main'}>{formik.errors.name}</Typography>
            )}

            <TextField
              fullWidth
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              type={'text'}
              rows={3}
              multiline
              placeholder="¿Cual es la description del entregable?"
              helperText="Descripción"
              onBlur={formik.handleBlur}
              autoComplete='off' />
            {formik.touched.description && formik.errors.description && (
              <Typography variant='caption' color={'info.main'}>{formik.errors.description}</Typography>
            )}

            <TextField
              fullWidth
              name="note"
              onChange={formik.handleChange}
              value={formik.values.note}
              type={'number'}
              placeholder="¿Cual es la calificación del entregable?"
              helperText="Calificación"
              onBlur={formik.handleBlur}
              autoComplete='off' />
            {formik.touched.note && formik.errors.note && (
              <Typography variant='caption' color={'info.main'}>{formik.errors.note}</Typography>
            )}

            <TextField
              fullWidth
              name="percent"
              onChange={formik.handleChange}
              value={formik.values.percent}
              type={'number'}
              placeholder="¿Cual es el porcentaje del entregable?"
              helperText="Porcentaje"
              onBlur={formik.handleBlur}
              autoComplete='off' />
            {formik.touched.percent && formik.errors.percent && (
              <Typography variant='caption' color={'info.main'}>{formik.errors.percent}</Typography>
            )}

            <Select
              fullWidth
              value={formik.values.status}
              onChange={formik.handleChange}
              name={'status'}
              onBlur={formik.handleBlur}>
              <MenuItem value={DELIVERABLE_STATUS.PENDING}>{DELIVERABLE_STATUS.PENDING}</MenuItem>
              <MenuItem value={DELIVERABLE_STATUS.SEND}>{DELIVERABLE_STATUS.SEND}</MenuItem>
            </Select>
            {formik.touched.status && formik.errors.status && (
              <Typography variant='caption' color={'info.main'}>{formik.errors.status}</Typography>
            )}
            <Button
              fullWidth
              type='submit'
              color='success'
              variant='contained'>
              Crear
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
