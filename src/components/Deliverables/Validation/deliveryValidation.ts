import { DELIVERABLE_STATUS } from "@/interfaces/deliveries.interface";
import * as Yup from "yup";

export const deliveryValidation = Yup.object({
  name: Yup.string()
    .min(5, "Use al menos 5 caracteres")
    .required("El nombre del entregable es obligatorio"),
  description: Yup.string()
    .min(5, "Use al menos 5 caracteres")
    .required("La descripción del entregable es obligatoria"),
  deadline: Yup.date().required(
    "La fecha límite del entregable es obligatoria"
  ),
  status: Yup.string().required("El estado del entregable es obligatorio"),
  note: Yup.number()
    .when("status", {
      is: (status: DELIVERABLE_STATUS) => status === DELIVERABLE_STATUS.SEND,
      then: (schema) => schema.max(100).min(0),
      otherwise: (schema) =>
        schema.min(0).max(0, "No se puede calificar sin enviarlo"),
    })
    .required("La nota es requerida"),
  percent: Yup.number()
    .min(0, "El porcentaje mínimo es cero")
    .max(100, "El porcentaje máximo es 100")
    .required("El porcentaje del entregable es obligatorio"),
});
