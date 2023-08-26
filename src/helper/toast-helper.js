import { toast } from "react-toastify";

export function showSuccessToast(msg) {
	toast.success(msg);
}

export function showErrorToast({ msg }) {
	toast.error(msg);
}
