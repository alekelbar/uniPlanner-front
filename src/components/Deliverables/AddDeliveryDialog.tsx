import {
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
import { logOut } from "../../helpers/local-storage";
import { makePriority } from "../Career/helpers/priorityCalc";
import { DELIVERABLE_STATUS } from "../../interfaces/deliveries.interface";
import { RESPONSES } from "../../interfaces/response-messages";
import { useAppDispatch, useAppSelector } from "../../redux";
import { onLogOut } from "../../redux/slices/auth/authSlice";
import { startcreateDelivery } from "../../redux/thunks/deliverables-thunks";
import { Loading } from "@/components/common/Loading";
import { deliveryValidation } from "./Validation/deliveryValidation";
import { useTheme } from "@emotion/react";
import { Close } from "@mui/icons-material";
import { TextFieldError } from "../common/TextFieldError";

interface AddDeliveryDialogProps {
  open: boolean;
  onClose: () => void;
}

const initialValues = {
  name: "",
  description: "",
  deadline: "",
  status: DELIVERABLE_STATUS.PENDING,
  note: 0,
  percent: 0,
};

export default function AddDeliveryDialog({
  onClose,
  open,
}: AddDeliveryDialogProps): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    query: { courseId },
  } = router;

  const { selected } = useAppSelector((state) => state.setting);
  const theme: Partial<Theme> = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints!.up("md"));

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const { deadline, description, name, note, percent, status } = values;

      const { importance, urgency } = makePriority(
        new Date(deadline),
        percent >= selected!.importance
      );

      const response = await dispatch(
        startcreateDelivery({
          deadline: new Date(deadline).toString(),
          description,
          name,
          note,
          percent,
          status,
          importance,
          urgency,
          course: courseId as string,
        })
      );
      if (response !== RESPONSES.SUCCESS) Swal.fire(response);

      formik.resetForm();
      onClose();
    },
    validationSchema: deliveryValidation,
  });

  if (open && !selected) return <Loading called="addDelivery" />;

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
          <Stack spacing={1} display={"flex"} direction={"column"}>
            <Button variant="outlined" onClick={onClose}>
              <Close />
            </Button>
            <Typography variant="subtitle1" align="center">
              Nueva entrega
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
              name="deadline"
              onChange={formik.handleChange}
              value={formik.values.deadline}
              type={"datetime-local"}
              onBlur={formik.handleBlur}
              autoComplete="off"
              helperText="Fecha de entrega"
            />
            {formik.touched.deadline && formik.errors.deadline && (
              <TextFieldError msg={formik.errors.deadline} />
            )}

            <TextField
              fullWidth
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              type={"text"}
              rows={2}
              multiline
              placeholder="¿Cual es el nombre del entregable?"
              helperText="Entregable"
              onBlur={formik.handleBlur}
              autoComplete="off"
            />
            {formik.touched.name && formik.errors.name && (
              <TextFieldError msg={formik.errors.name} />
            )}

            <TextField
              fullWidth
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              type={"text"}
              rows={3}
              multiline
              placeholder="¿Cual es la description del entregable?"
              helperText="Descripción"
              onBlur={formik.handleBlur}
              autoComplete="off"
            />
            {formik.touched.description && formik.errors.description && (
              <TextFieldError msg={formik.errors.description} />
            )}

            <TextField
              fullWidth
              name="note"
              onChange={formik.handleChange}
              value={formik.values.note}
              type={"number"}
              placeholder="¿Cual es la calificación del entregable?"
              helperText="Calificación"
              onBlur={formik.handleBlur}
              autoComplete="off"
            />
            
            {formik.touched.note && formik.errors.note && (
              <TextFieldError msg={formik.errors.note} />
            )}

            <TextField
              fullWidth
              name="percent"
              onChange={formik.handleChange}
              value={formik.values.percent}
              type={"number"}
              placeholder="¿Cual es el porcentaje del entregable?"
              helperText="Porcentaje"
              onBlur={formik.handleBlur}
              autoComplete="off"
            />
            {formik.touched.percent && formik.errors.percent && (
              <TextFieldError msg={formik.errors.percent} />
            )}

            <Select
              fullWidth
              value={formik.values.status}
              onChange={formik.handleChange}
              name={"status"}
              onBlur={formik.handleBlur}
            >
              <MenuItem value={DELIVERABLE_STATUS.PENDING}>
                {DELIVERABLE_STATUS.PENDING}
              </MenuItem>
              <MenuItem value={DELIVERABLE_STATUS.SEND}>
                {DELIVERABLE_STATUS.SEND}
              </MenuItem>
            </Select>
            {formik.touched.status && formik.errors.status && (
              <TextFieldError msg={formik.errors.status} />
            )}
            <Button fullWidth type="submit" color="success" variant="contained">
              Crear
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
