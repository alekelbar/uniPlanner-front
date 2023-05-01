import * as Yup from "yup";

export const taskValidation = Yup.object({
  descripcion: Yup.string()
    .required("La descripción de la tarea es requerida")
    .min(5, "Trate de usar al menos 5 caracteres"),
  name: Yup.string()
    .required("El nombre de la tarea es requerida")
    .min(5, "Trate de usar al menos 5 caracteres"),
  status: Yup.string().required("El status de la tarea es requerida"),
});
