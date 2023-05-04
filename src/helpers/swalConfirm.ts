import Swal from "sweetalert2";

export const confirmWithSweetAlert = async () => {
  return await Swal.fire({
    title: "¿Seguro?",
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonColor: "green",
    cancelButtonColor: "red",
    confirmButtonText: "Si",
    cancelButtonText: "No",
    backdrop: true,
    focusCancel: true,
  });
};
