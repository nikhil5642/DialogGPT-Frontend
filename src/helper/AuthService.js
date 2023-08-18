import Cookies from "js-cookie";
import axios from "axios";
import { API_BASE_URL } from "./http-helper.js";

const AuthService = {
	login: async (idToken) => {
		try {
			const response = await axios.post(`${API_BASE_URL}/authenticate`, {
				token: idToken,
			});
			const jwttoken = response.data.access_token;
			await Cookies.set("jwtToken", jwttoken, {
				secure: true,
				httpOnly: false,
				sameSite: "strict",
			});
			return jwttoken;
		} catch (error) {
			throw error;
		}
	},
	logout: async () => {
		Cookies.remove("jwtToken");
	},
	getToken: () => {
		return Cookies.get("jwtToken");
	},
	isAuthenticated: () => {
		const token = Cookies.get("jwtToken");
		return !!token;
	},
};

export default AuthService;
