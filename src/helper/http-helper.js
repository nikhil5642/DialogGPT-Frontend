import axios from "axios";
import AuthService from "./AuthService";
import Router from "next/router";
import { showErrorToast } from "./toast-helper";

// Add your backend API base URL here
export const API_BASE_URL = "http://localhost:8000";
// export const API_BASE_URL = "https://api.dialoggpt.io";

// Set up default Axios configurations
const instance = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000, // Adjust timeout as needed
});
// Function to attach JWT token to headers
const attachTokenToHeaders = (headers = {}) => {
	const token = AuthService.getToken();

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	return headers;
};

// Function to make GET requests with JWT token
export const getRequest = async (
	endpoint,
	headers = {},
	customTimeout = 10000,
) => {
	try {
		const response = await instance.get(`${API_BASE_URL}${endpoint}`, {
			headers: attachTokenToHeaders(headers),
			timeout: customTimeout,
		});

		return response.data;
	} catch (error) {
		handleHttpError(error);
	}
};

// Function to make POST requests with JWT token
export const postRequest = async (
	endpoint,
	data,
	headers = {},
	customTimeout = 10000,
) => {
	try {
		const response = await instance.post(`${API_BASE_URL}${endpoint}`, data, {
			headers: attachTokenToHeaders(headers),
			timeout: customTimeout,
		});

		return response.data;
	} catch (error) {
		handleHttpError(error);
	}
};

function handleHttpError(error) {
	if (!error.response || !error.response.status) {
		showErrorToast("Something went wrong!");
	} else if (error.response.status == 401) {
		Router.push("/signin");
	} else if (error.response.status == 501) {
		showErrorToast(error.response.data.detail);
	} else {
		throw error;
	}
}

// Export the instance for custom configurations
export default instance;
