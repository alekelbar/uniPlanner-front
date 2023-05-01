import {
  DELIVERABLE_STATUS,
  Deliverable,
} from "@/interfaces/deliveries.interface";
import {
  Button,
  Container,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { makePriority } from "../Career/helpers/priorityCalc";
import { useAppDispatch, useAppSelector } from "@/redux";
import { startUpdateDelivery } from "@/redux/thunks/deliverables-thunks";
import { RESPONSES } from "@/interfaces/response-messages";
import Swal from "sweetalert2";
import { EditDeliveryValidation } from "./Validation/EditDeliveryValidation";
import { format, parseISO } from "date-fns";

interface IEditDeliveryProps {
  delivery: Deliverable;
}

export const EditDelivery: React.FC<IEditDeliveryProps> = ({ delivery }) => {
  const { selected: selectedSetting } = useAppSelector((st) => st.setting);
  const dispatch = useAppDispatch();

  const { deadline } = delivery;

  const initialValues = {
    name: delivery.name,
    description: delivery.description,
    deadline: format(
      delivery ? new Date(deadline) : new Date(),
      "yyyy-MM-dd'T'HH:mm"
    ),
    status: delivery.status,
    note: delivery.note,
    percent: delivery.percent,
  };

  const onSubmit = async (values: typeof initialValues) => {
    const { deadline, description, name, note, percent, status } = values;

    const { importance, urgency } = makePriority(
      new Date(deadline),
      percent >= selectedSetting!.importance ? true : false
    );

    const response = await dispatch(
      startUpdateDelivery({
        deadline: new Date(deadline).toString(),
        description,
        name,
        note,
        percent,
        status,
        importance,
        urgency,
        course: delivery.course,
        _id: delivery._id,
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
      validationSchema={EditDeliveryValidation}
    >
      {(formik) => (
        <Container sx={{ mt: 3 }}>
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
            />
            {formik.touched.deadline && formik.errors.deadline && (
              <Typography variant="caption" color={"info.main"}>
                {formik.errors.deadline}
              </Typography>
            )}

            <TextField
              fullWidth
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              type={"text"}
              placeholder="¿Cual es el nombre del entregable?"
              helperText="Entregable"
              onBlur={formik.handleBlur}
              autoComplete="off"
              rows={2}
              multiline
            />
            {formik.touched.name && formik.errors.name && (
              <Typography variant="caption" color={"info.main"}>
                {formik.errors.name}
              </Typography>
            )}

            <TextField
              fullWidth
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              type={"text"}
              rows={6}
              multiline
              placeholder="¿Cual es la description del entregable?"
              helperText="Descripción"
              onBlur={formik.handleBlur}
              autoComplete="off"
            />
            {formik.touched.description && formik.errors.description && (
              <Typography variant="caption" color={"info.main"}>
                {formik.errors.description}
              </Typography>
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
              <Typography variant="caption" color={"info.main"}>
                {formik.errors.note}
              </Typography>
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
              <Typography variant="caption" color={"info.main"}>
                {formik.errors.percent}
              </Typography>
            )}

            <Select
              fullWidth
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name={"status"}
            >
              <MenuItem value={DELIVERABLE_STATUS.PENDING}>
                {DELIVERABLE_STATUS.PENDING}
              </MenuItem>
              <MenuItem value={DELIVERABLE_STATUS.SEND}>
                {DELIVERABLE_STATUS.SEND}
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
