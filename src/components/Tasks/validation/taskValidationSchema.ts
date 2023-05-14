import * as Yup from "yup";

export const taskValidation = Yup.object({
  descripcion: Yup.string().optional().default(""),
  name: Yup.string()
    .required("El nombre de la tarea es requerido")
    .min(5, "Trate de usar al menos 5 caracteres"),
  status: Yup.string().required("El estado de la tarea es requerida"),
});
