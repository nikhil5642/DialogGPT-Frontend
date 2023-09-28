import { toast } from "react-toastify";

export function showSuccessToast(msg) {
	toast.success(msg, {
		position: toast.POSITION.TOP_RIGHT,
		autoClose: 5000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		style: {
			fontFamily: "Roboto, sans-serif",
			fontWeight: 400,
			fontSize: "0.95rem",
			lineHeight: "1.4",
			backgroundColor: "#F7F8F9", // Neutral background
			color: "#333", // Dark text
			borderRadius: "5px",
			borderLeft: "5px solid #4CAF50", // Green label for success
			padding: "10px 20px",
			transition: "all 0.3s ease",
		},
	});
}

export function showErrorToast(msg) {
	toast.error(msg, {
		position: toast.POSITION.TOP_RIGHT,
		autoClose: 5000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		style: {
			fontFamily: "Roboto, sans-serif",
			fontWeight: 400,
			fontSize: "0.95rem",
			lineHeight: "1.4",
			backgroundColor: "#F7F8F9", // Neutral background
			color: "#333", // Dark text
			borderRadius: "5px",
			borderLeft: "5px solid #F44336", // Red label for error
			padding: "10px 20px",
			transition: "all 0.3s ease",
		},
	});
}
