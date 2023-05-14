import Swal from "sweetalert2";

export const confirmWithSweetAlert = async () => {
  return await Swal.fire({
    title: "Esta acción es irreversible",
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonColor: "green",
    cancelButtonColor: "red",
    confirmButtonText: "Estoy seguro",
    cancelButtonText: "Cancelar",
    backdrop: true,
    focusCancel: true,
    icon: "question",
  });
};
