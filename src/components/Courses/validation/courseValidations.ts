import * as Yup from "yup";

export const courseValidations = Yup.object({
  name: Yup.string()
    .min(5, "Trata de utilizar al menos 5 caracteres")
    .required("Falta el nombre del curso"),
  courseDescription: Yup.string().optional().default(""),
  credits: Yup.number()
    .positive("Debe ser un numero positivo")
    .required("Porfavor, agrega los creditos que vale este curso"),
});
