import * as Yup from "yup";

export const sessionValidations = Yup.object({
  duration: Yup.string()
    .test(
      "is-number",
      "La duración debe ser un número, y al menos 1 minuto",
      (value) => {
        if (isNaN(Number(value))) {
          return false;
        }
        return Number(value) >= 1;
      }
    )
    .required("La duración de la sesión es requerida"),
  name: Yup.string()
    .min(2, "El nombre de una sesión debé al menos tener 2 caracteres")
    .required("El nombre de la sesión es requerido"),
  type: Yup.string().required("El tipo de sesión es requerido"),
});
