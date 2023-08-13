import axios from "axios";
import AuthService from "./AuthService";

// Add your backend API base URL here
export const API_BASE_URL = "http://localhost:8000";
// export const baseUrl = "https://api.chessmeito.com";

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
export const getRequest = async (endpoint, headers = {}) => {
	try {
		const response = await instance.get(`${API_BASE_URL}${endpoint}`, {
			headers: attachTokenToHeaders(headers),
		});

		return response.data;
	} catch (error) {
		throw error;
	}
};

// Function to make POST requests with JWT token
export const postRequest = async (endpoint, data, headers = {}) => {
	try {
		const response = await instance.post(`${API_BASE_URL}${endpoint}`, data, {
			headers: attachTokenToHeaders(headers),
		});

		return response.data;
	} catch (error) {
		throw error;
	}
};

// Export the instance for custom configurations
export default instance;
