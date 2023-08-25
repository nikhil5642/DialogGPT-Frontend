import axios from "axios";
import { API_BASE_URL } from "./http-helper.js";
import { removeCookie, storeCookie, getCookie } from "./cookie-helper.js";

const AuthService = {
	login: async (idToken) => {
		try {
			const response = await axios.post(`${API_BASE_URL}/authenticate`, {
				token: idToken,
			});
			const jwttoken = response.data.access_token;
			await storeCookie("jwtToken", jwttoken);
			return jwttoken;
		} catch (error) {
			throw error;
		}
	},
	logout: async () => {
		removeCookie("jwtToken");
	},
	getToken: () => {
		return getCookie("jwtToken");
	},
	isAuthenticated: () => {
		const token = getCookie("jwtToken");
		return !!token;
	},
};

export default AuthService;
