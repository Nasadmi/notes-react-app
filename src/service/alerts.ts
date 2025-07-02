import Swal, { type SweetAlertOptions } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const Toast = withReactContent(Swal).mixin({
    toast: true,
    position: 'bottom-end',
    timer: 3000,
    showConfirmButton: false,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
})

export const Alert = withReactContent(Swal)

export const ErrorAlert: SweetAlertOptions = {
    title: 'Something went wrong',
    icon: 'error'
}