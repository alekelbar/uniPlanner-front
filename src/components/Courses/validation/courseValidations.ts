import * as Yup from 'yup'

export const courseValidations = Yup.object({
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